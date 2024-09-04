export class FigmaEventManager {
  constructor() {}

  async addSelectionChangeListener(callback: () => void) {
    figma.on('selectionchange', callback);
  }

  removeSelectionChangeListener(callback: () => void) {
    figma.off('selectionchange', callback);
  }
}
