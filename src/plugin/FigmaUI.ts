import { FigmaUIMessaging, MessageType } from '@/plugin/FigmaUIMessaging';
import { FigmaEventManager } from '@/plugin/FigmaEventManager';
import { MessageSender } from '@/plugin/MessageSender';
import { ErrorHandler } from '@/plugin/ErrorHandler';
import { Logger } from '@/plugin/Logger';
import { FigmaAPI } from '@/plugin/FigmaAPI';
import { EventType, UIEventType } from '@/eventType';
import { ImageUintArrayCollector } from '@/plugin/ImageUintArrayCollector';
import { RelaunchDataManager } from '@/plugin/RelaunchDataManager';
import { PluginDataStorage } from '@/plugin/PluginDataStorage';
import { RELAUNCH_DATA_STORE_KEY } from '@/plugin/constants';
import { CommandHandler } from '@/plugin/CommandHandler';

export class FigmaUI {
  private readonly width: number = 615;
  private readonly height: number = 716;

  private logger: Logger;
  private figmaUIMessaging: FigmaUIMessaging;
  private figmaEventManager: FigmaEventManager;
  private messageSender: MessageSender;
  private errorHandler: ErrorHandler;
  private figmaAPI: FigmaAPI;
  private relaunchDataManager: RelaunchDataManager;
  private pluginDataStorage: PluginDataStorage;
  private commandHandler: CommandHandler;

  constructor() {
    figma.showUI(__html__, { width: this.width, height: this.height });

    this.logger = new Logger();
    this.figmaUIMessaging = new FigmaUIMessaging();
    this.figmaEventManager = new FigmaEventManager();
    this.messageSender = new MessageSender();
    this.errorHandler = new ErrorHandler();
    this.figmaAPI = new FigmaAPI();
    this.relaunchDataManager = new RelaunchDataManager();
    this.pluginDataStorage = new PluginDataStorage();
    this.commandHandler = new CommandHandler();
  };

  async init() {
    this.clearConsole();

    this.commandHandler.handleCommand();

    const relaunchData = this.pluginDataStorage.getCurrentPageData(RELAUNCH_DATA_STORE_KEY);

    this.figmaAPI.sendCurrentUserInformation();
    // We call this function for first time and check if user selected right node
    await this.handleSelectionChange();

    this.figmaUIMessaging.subscribe((message: MessageType) => this.handleUIMessage(message));
    await this.figmaEventManager.addSelectionChangeListener(() => this.handleSelectionChange());

    if (!Boolean(relaunchData)) {
      this.setRelaunchData();
    }
  };

  // private async reopenApplication() {
  //   figma.showUI(__html__, { width: this.width, height: this.height });
  //   await this.init();
  // };

  private clearConsole() {
    console.clear();
  };

  private setRelaunchData() {
    this.relaunchDataManager.setRelaunchDataForAllImages();

    figma.currentPage.setRelaunchData({ imagesOptimization: 'Optimized Figma images' });
    this.pluginDataStorage.setCurrentPageData(RELAUNCH_DATA_STORE_KEY, 'true');
  }


  private async handleSelectionChange() {
    const selectedNodes = figma.currentPage.selection;

    if (selectedNodes.length === 0) {
      return;
    }

    if (selectedNodes.length > 1) {
      this.errorHandler.handleMultipleSelections();
      return;
    }

    const selectedNode = selectedNodes[0];

    if (selectedNode.height !== selectedNode.width) {
      this.errorHandler.handleNonSquareNode();
      return;
    }

    try {
      // TODO: Think about how we can improve this function
      const unitArray = await selectedNode.exportAsync({
        format: "PNG",
        suffix: "",
        contentsOnly: true,
        constraint: {
          type: "WIDTH",
          value: 300,
        }
      });

      const message = {
        type: EventType.IMAGE_UNIT_ARRAY_DATA,
        payload: {
          data: unitArray
        }
      }

      this.sendMessageToUI(message);
    } catch (e) {
      this.logger.logError(e)
    }
  };


  private async handleUIMessage(message: MessageType) {

    const { type } = message;


    if (type === UIEventType.GET_IMAGES_UINT_ARRAY_COLLECTION) {
      await this.collectNodes();
    }

    // if (type === UIEventType.REOPEN_APPLICATION) {
    //   await this.reopenApplication();
    // }

    console.log('Message from UI', message)
  };

  private async collectNodes() {

    const collector = new ImageUintArrayCollector({
      chunkSize: 3,
      onChunkProcessed: (collection: ImageInfo[]) => {
        this.figmaAPI.sendImageCollectionToUI(collection);
      },
      onCompleted: () => {
        collector.clear();

        const message = {
          type: EventType.IMAGE_COLLECTION_COMPLETE,
          payload: {}
        }

        this.sendMessageToUI(message);

      }
    });

    collector.collectNodesAsync(figma.currentPage);
  }

  private sendMessageToUI(message: MessageType) {
    this.messageSender.sendMessageToUI(message);
  };
}