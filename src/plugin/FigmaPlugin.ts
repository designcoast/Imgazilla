import { FigmaUI } from '@/plugin/FigmaUI';

export class FigmaPlugin {
  private ui: FigmaUI;

  constructor() {
    this.ui = new FigmaUI();
  }

  run() {
    this.ui.init();
  }
}

const plugin = new FigmaPlugin();

plugin.run();