import { FigmaUIMessaging, MessageType } from '@/plugin/FigmaUIMessaging';
import { FigmaEventManager } from '@/plugin/FigmaEventManager';
import { MessageSender } from '@/plugin/MessageSender';
import { ErrorHandler } from '@/plugin/ErrorHandler';
import { Logger } from '@/plugin/Logger';
import { FigmaAPI } from '@/plugin/FigmaAPI';
import { EventType, UIEventType } from '@/eventType';
// import { ImageUintArrayCollector } from '@/plugin/ImageUintArrayCollector';
import { ImageUintArrayCollector } from '@/plugin/ImageUintArrayCollector';

export class FigmaUI {
  private readonly width: number = 615;
  private readonly height: number = 716;

  private logger: Logger;
  private figmaUIMessaging: FigmaUIMessaging;
  private figmaEventManager: FigmaEventManager;
  private messageSender: MessageSender;
  private errorHandler: ErrorHandler;
  private figmaAPI: FigmaAPI;

  constructor() {
    figma.showUI(__html__, { width: this.width, height: this.height });

    this.logger = new Logger();
    this.figmaUIMessaging = new FigmaUIMessaging();
    this.figmaEventManager = new FigmaEventManager();
    this.messageSender = new MessageSender();
    this.errorHandler = new ErrorHandler();
    this.figmaAPI = new FigmaAPI();
  };

  async init() {
    this.clearConsole();
    this.figmaAPI.sendCurrentUserInformation();
    // We call this function for first time and check if user selected right node
    await this.handleSelectionChange();

    this.figmaUIMessaging.subscribe((message: MessageType) => this.handleUIMessage(message));
    await this.figmaEventManager.addSelectionChangeListener(() => this.handleSelectionChange());
  };

  private clearConsole() {
    console.clear();
  };


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

    selectedNode.setRelaunchData({ favicon: 'Export favicon from selected image', open: '' })

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

  private sendImageCollectionToUI(collection: Uint8Array[]) {
      const message = {
        type: EventType.IMAGES_UINT_ARRAY_COLLECTION,
        payload: {
          data: collection
        }
      }

      this.sendMessageToUI(message);
  }

  private async collectNodes() {
    const collector = new ImageUintArrayCollector(() => {
      const collection = collector.getUintArray();
      this.sendImageCollectionToUI(collection);

      collector.clear();
    });

    collector.collectNodesAsync(figma.currentPage);
  }

  private async handleUIMessage(message: MessageType) {

    const { type } = message;


    if (type === UIEventType.GET_IMAGES_UINT_ARRAY_COLLECTION) {
      await this.collectNodes();
    }

    console.log('Message from UI', message)
  };

  private sendMessageToUI(message: MessageType) {
    this.messageSender.sendMessageToUI(message);
  };
}