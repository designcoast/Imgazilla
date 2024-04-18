import { MessageSender } from '@/plugin/MessageSender';
import { EventType } from '@/eventType';

export class FigmaAPI {
  private messageSender: MessageSender;

  constructor() {
    this.messageSender = new MessageSender();
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
}