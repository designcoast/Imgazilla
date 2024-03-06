export type MessageType = {
  type: string;
  payload: unknown;
};

export class FigmaUIMessaging {
  private subscribers: ((message: MessageType) => void)[] = [];

  constructor() {
    figma.ui.onmessage = (message: MessageType) => this.handleMessage(message);
  }

  subscribe(callback: (message: MessageType) => void) {
    this.subscribers.push(callback);
  }

  private handleMessage(message: MessageType) {
    this.notifySubscribers(message);
  }

  private notifySubscribers(message: MessageType) {
    this.subscribers.forEach(subscriber => {
      subscriber(message);
    });
  }
}