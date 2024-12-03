import { MessageSender } from '@/plugin/MessageSender';

export class FigmaStorageManager {
  private readonly messageSender: MessageSender;

  constructor() {
    this.messageSender = new MessageSender();
  }

  async getGlobalData(key: string): Promise<string | null> {
    return await figma.clientStorage.getAsync(key);
  }

  async setGlobalData(key: string, value: string): Promise<void> {
    await figma.clientStorage.setAsync(key, value);
  }

  async deleteGlobalData(key: string): Promise<void> {
    await figma.clientStorage.deleteAsync(key);
  }

  sendMessageToUI(message: MessageType) {
    this.messageSender.sendMessageToUI(message);
  }
}
