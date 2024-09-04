import { generateUUID } from '@/plugin/utils/generateUUID';
import { findAll } from '@/plugin/utils/findMethods';

interface NodeProcessorOptions {
  chunkSize: number;
  onChunkProcessed: (nodes: ImageInfo[]) => void;
  onCompleted: () => void;
}

export class ImageUintArrayCollector {
  private imageInfos: ImageInfo[] = [];
  private options: NodeProcessorOptions;

  constructor(options: NodeProcessorOptions) {
    this.options = options;
  }

  public async collectNodesFromSelection(selection: BaseNode[]): Promise<void> {
    if (selection.length === 0) {
      this.options.onCompleted();
      return;
    }

    await this.processNodesWithTimeout(selection);
    this.options.onCompleted();
  }

  public async collectNodesFromPage(): Promise<void> {
    await figma.currentPage.loadAsync();

    const nodes = findAll(
      figma.currentPage.children,
      (node: SceneNode) => node.exportSettings.length !== 0,
    );
    console.log('nodes', nodes);
    // await this.timeout(200);
    //
    // await this.processNodesWithTimeout(nodes);
    //
    // this.options.onCompleted();
  }

  private async processNodesWithTimeout(nodes: BaseNode[]): Promise<void> {
    for (let i = 0; i < nodes.length; i += this.options.chunkSize) {
      const chunk = nodes.slice(i, i + this.options.chunkSize);

      for (const node of chunk) {
        await this.processNode(node);
      }

      this.options.onChunkProcessed([...this.imageInfos]);
      this.imageInfos = [];

      await this.timeout(0);
    }
  }

  private async processNode(node: any): Promise<void> {
    for (const setting of node.exportSettings) {
      await this.processImage(node, setting);
    }
  }

  private async processImage(
    node: any,
    setting: ExportSettings,
  ): Promise<void> {
    try {
      const bytes = await node.exportAsync(setting);

      const { width, height, name } = node;
      const sizeInBytes = bytes.length;
      const sizeInKB = sizeInBytes / 1024;

      const imageInfo: ImageInfo = {
        uuid: generateUUID(),
        name,
        width,
        height,
        setting,
        format: setting.format,
        uintArray: bytes,
        optimizationPercent: 100,
        isSelected: false,
        size: sizeInKB,
      };

      this.imageInfos.push(imageInfo);
    } catch (e) {
      console.error(`ERROR processing node ${node.name}: ${e.message}`);
    }
  }

  private timeout(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public clear(): void {
    this.imageInfos = [];
  }
}
