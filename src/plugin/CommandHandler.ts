import { MessageSender } from '@/plugin/MessageSender';
import { MessageType } from '@/plugin/FigmaUIMessaging';
import { EventType } from '@/eventType';
import { FIGMA_COMMANDS_KEY } from '@/plugin/constants';

export class CommandHandler {
  private readonly commandMap: { [key: string]: () => void };
  private messageSender: MessageSender;

  constructor() {
    this.commandMap = {
      [FIGMA_COMMANDS_KEY.IMAGE_OPTIMIZATION]: () =>
        this.handleImagesOptimizationCommand(),
      [FIGMA_COMMANDS_KEY.FAVICON_EXPORT]: () =>
        this.handleFaviconExportCommand(),
    };
    this.messageSender = new MessageSender();
  }

  public handleCommand(): void {
    const command = figma.command;

    switch (command) {
      case FIGMA_COMMANDS_KEY.IMAGE_OPTIMIZATION:
        this.commandMap[FIGMA_COMMANDS_KEY.IMAGE_OPTIMIZATION]();
        break;
      default:
        this.commandMap[FIGMA_COMMANDS_KEY.FAVICON_EXPORT]();
        break;
    }
  }

  private handleImagesOptimizationCommand() {
    const message = {
      type: EventType.OPEN_IMAGES_OPTIMIZATION_TAB,
      payload: {},
    } satisfies MessageType;

    this.messageSender.sendMessageToUI(message);
  }

  private handleFaviconExportCommand() {
    const message = {
      type: EventType.OPEN_FAVICON_EXPORT_TAB,
      payload: {},
    } satisfies MessageType;

    this.messageSender.sendMessageToUI(message);
  }
}
