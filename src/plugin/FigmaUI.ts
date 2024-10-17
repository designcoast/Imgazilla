import { FigmaUIMessaging, MessageType } from '@/plugin/FigmaUIMessaging';
import { FigmaEventManager } from '@/plugin/FigmaEventManager';
import { MessageSender } from '@/plugin/MessageSender';
import { FigmaAPI } from '@/plugin/FigmaAPI';
import { EventType, UIEventType } from '@/eventType';
import { ImageUintArrayCollector } from '@/plugin/ImageUintArrayCollector';
import { RelaunchDataManager } from '@/plugin/RelaunchDataManager';
import { PluginDataStorage } from '@/plugin/PluginDataStorage';
import { RELAUNCH_DATA_STORE_KEY } from '@/plugin/constants';
import { CommandHandler } from '@/plugin/CommandHandler';
import { FigmaGlobalSettingsManager } from '@/plugin/FigmaGlobalSettingsManager';

export class FigmaUI {
  private readonly width: number = 700;
  private readonly height: number = 650;

  private figmaUIMessaging: FigmaUIMessaging;
  private figmaEventManager: FigmaEventManager;
  private messageSender: MessageSender;
  private figmaAPI: FigmaAPI;
  private relaunchDataManager: RelaunchDataManager;
  private pluginDataStorage: PluginDataStorage;
  private commandHandler: CommandHandler;
  private globalSettings: FigmaGlobalSettingsManager;

  constructor() {
    figma.showUI(__html__, { width: this.width, height: this.height });

    this.figmaUIMessaging = new FigmaUIMessaging();
    this.figmaEventManager = new FigmaEventManager();
    this.messageSender = new MessageSender();

    this.figmaAPI = new FigmaAPI();
    this.relaunchDataManager = new RelaunchDataManager();
    this.pluginDataStorage = new PluginDataStorage();
    this.commandHandler = new CommandHandler();
    this.globalSettings = new FigmaGlobalSettingsManager();
  }

  async init() {
    this.clearConsole();

    this.commandHandler.handleCommand();

    await this.globalSettings.sendToUIGlobalSettings();

    const relaunchData = this.pluginDataStorage.getCurrentPageData(
      RELAUNCH_DATA_STORE_KEY,
    );

    this.figmaAPI.sendCurrentUserInformation();
    // We call this function for first time and check if user selected right node
    await this.figmaAPI.handleSelectionChange();

    this.figmaUIMessaging.subscribe((message: MessageType) =>
      this.handleUIMessage(message),
    );
    await this.figmaEventManager.addSelectionChangeListener(() =>
      this.figmaAPI.handleSelectionChange(),
    );

    if (!Boolean(relaunchData)) {
      this.setRelaunchData();
    }
  }

  private clearConsole() {
    console.clear();
  }

  private setRelaunchData() {
    this.relaunchDataManager.setRelaunchDataForAllImages();

    figma.currentPage.setRelaunchData({
      imagesOptimization: 'Optimized Figma images',
    });
    this.pluginDataStorage.setCurrentPageData(RELAUNCH_DATA_STORE_KEY, 'true');
  }

  private async handleUIMessage(message: MessageType) {
    const { type, payload } = message;

    if (type === UIEventType.GET_IMAGES_UINT_ARRAY_COLLECTION) {
      await this.collectNodes();
    }

    if (type === UIEventType.SET_CLIENT_STORE_DATA) {
      await this.handleClientStoreData(payload);
    }

    if (type === UIEventType.GET_SELECTED_IMAGES_UINT_ARRAY) {
      await this.figmaAPI.handleSelectedNodes();
    }

    if (type === UIEventType.ADD_IMAGE_TO_PAGE) {
      await this.figmaAPI.handleAddImageToPage(payload);
    }
  }

  private async handleClientStoreData(payload: any) {
    await this.globalSettings.updateGlobalSettings(payload);
  }

  private async collectNodes() {
    const collector = new ImageUintArrayCollector({
      chunkSize: 1,
      onChunkProcessed: (collection: ImageInfo[]) => {
        if (collection.length === 0) return;
        this.figmaAPI.sendImageCollectionToUI(collection);
      },
      onCompleted: () => {
        collector.clear();

        const message = {
          type: EventType.IMAGE_COLLECTION_COMPLETE,
          payload: {},
        };

        this.sendMessageToUI(message);
      },
    });

    await collector.collectNodesFromPage();
  }

  private sendMessageToUI(message: MessageType) {
    this.messageSender.sendMessageToUI(message);
  }
}
