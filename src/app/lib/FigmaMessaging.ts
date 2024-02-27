type Message = { [key: string]: any };

interface MessageSubscriber {
  (message: Message): void;
}

class FigmaMessaging {
  private subscribers: MessageSubscriber[] = [];

  constructor() {
    window.onmessage = (event: {
      data: Message
    }) => {
      const message = event.data.pluginMessage;

      for (const subscriber of this.subscribers) {
        subscriber(message);
      }
    };
  }
  public sendMessage(message: Message) {
    parent.postMessage({ pluginMessage: { ...message } }, '*');
  }

  public subscribe(subscriber: MessageSubscriber): () => void {
    this.subscribers.push(subscriber);
    return () => {
      const index = this.subscribers.indexOf(subscriber);
      if (index !== -1) {
        this.subscribers.splice(index, 1);
      }
    };
  }
}

export default FigmaMessaging;
