import { MessageSender } from '@/plugin/MessageSender';
import { EventType } from '@/eventType';
import { ErrorHandler } from '@/plugin/ErrorHandler';
import { Logger } from '@/plugin/Logger';
import { MessageType } from '@/plugin/FigmaUIMessaging';
import { ImageUintArrayCollector } from '@/plugin/ImageUintArrayCollector';

export class FigmaAPI {
  private messageSender: MessageSender;
  private errorHandler: ErrorHandler;
  private logger: Logger;

  constructor() {
    this.messageSender = new MessageSender();
    this.errorHandler = new ErrorHandler();
    this.logger = new Logger();
  }

  sendCurrentUserInformation() {
    const message = {
      type: EventType.USER_ACCOUNT_DATA,
      payload: {
        data: figma.currentUser
      }
    }
    this.messageSender.sendMessageToUI(message);
  }

  sendImageCollectionToUI(collection: ImageInfo[]) {
    const message = {
      type: EventType.IMAGES_UINT_ARRAY_COLLECTION,
      payload: {
        data: collection
      }
    }

    this.messageSender.sendMessageToUI(message);
  }

  sendSelectedImageCollectionToUI(collection: ImageInfo[]) {
    const message = {
      type: EventType.SELECTED_IMAGES_COLLECTION,
      payload: {
        data: collection
      }
    }

    this.messageSender.sendMessageToUI(message);
  }

  async handleSelectionChange() {
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

  async handleSelectedNodes() {
    const selectedNodes = figma.currentPage.selection;

    const collector = new ImageUintArrayCollector({
      chunkSize: 1,
      onChunkProcessed: (collection: ImageInfo[]) => {
        this.sendSelectedImageCollectionToUI(collection);
      },
      onCompleted: () => {
        collector.clear();

        const message = {
          type: EventType.SELECTED_IMAGES_COLLECTION_COMPLETE,
          payload: {}
        }

        this.sendMessageToUI(message);
      }
    });

    if (selectedNodes.length > 0) {
      collector.collectNodesFromSelection(selectedNodes as BaseNode[]);
    }

    if (selectedNodes.length === 0) {
      const message = {
        type: EventType.SELECTED_IMAGES_COLLECTION,
        payload: {
          data: []
        }
      }

      this.sendMessageToUI(message);
    }
  }

  private sendMessageToUI(message: MessageType) {
    this.messageSender.sendMessageToUI(message);
  };
}