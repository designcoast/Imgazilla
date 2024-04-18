import { MessageSender } from '@/plugin/MessageSender';
import { MessageType } from '@/plugin/FigmaUIMessaging';
import { EventType } from '@/eventType';

export class CommandHandler {

  private readonly commandMap: { [key: string]: () => void };
  private messageSender: MessageSender;

  constructor() {
    this.commandMap = {
      'imagesOptimization': () => this.handleImagesOptimizationCommand(),
    };
    this.messageSender = new MessageSender();
  }

  public handleCommand(): void {
    const command = figma.command;
    if (command in this.commandMap) {
      this.commandMap[command]();
    }
  }

  private handleImagesOptimizationCommand() {
    const message = {
      type: EventType.OPEN_IMAGES_OPTIMIZATION_TAB,
      payload: {}
    } satisfies MessageType

    this.messageSender.sendMessageToUI(message)
  }
}
