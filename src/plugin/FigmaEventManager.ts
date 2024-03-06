export class FigmaEventManager {
  constructor() {}

  addSelectionChangeListener(callback: () => void) {
    figma.on('selectionchange', callback);
  }

  removeSelectionChangeListener(callback: () => void) {
    figma.off('selectionchange', callback);
  }
}