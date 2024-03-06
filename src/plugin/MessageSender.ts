import { MessageType } from '@/plugin/FigmaUIMessaging';

export class MessageSender {
  constructor() {}

  sendMessageToUI(message: MessageType) {
    figma.ui.postMessage(message);
  }
}