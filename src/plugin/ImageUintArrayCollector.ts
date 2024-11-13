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

    await this.processNodesWithTimeout(selection, true);
    this.options.onCompleted();
  }

  public async collectNodesFromPage(): Promise<void> {
    await figma.currentPage.loadAsync();

    const nodes = findAll(
      figma.currentPage.children,
      (node: SceneNode) => node.exportSettings.length !== 0,
    );
    await this.timeout(200);

    await this.processNodesWithTimeout(nodes);

    this.options.onCompleted();
  }

  private async processNodesWithTimeout(
    nodes: BaseNode[],
    isSelectionMode: boolean = false,
  ): Promise<void> {
    for (let i = 0; i < nodes.length; i += this.options.chunkSize) {
      const chunk = nodes.slice(i, i + this.options.chunkSize);

      for (const node of chunk) {
        await this.processNode(node, isSelectionMode);
      }

      this.options.onChunkProcessed([...this.imageInfos]);
      this.imageInfos = [];

      await this.timeout(0);
    }
  }

  private async processNode(
    node: any,
    isSelectionMode: boolean,
  ): Promise<void> {
    if (isSelectionMode) {
      await this.processImage(node);
      return;
    }

    for (const setting of node.exportSettings) {
      await this.processImage(node, setting);
    }
  }

  private async processImage(
    node: any,
    setting?: ExportSettings,
  ): Promise<void> {
    try {
      const constraint = node.exportSettings[0]?.constraint;
      const scaleValue =
        constraint?.type === 'SCALE' ? constraint?.value || 1 : 1;

      const updatedSettings = setting
        ? setting
        : {
            constraint: {
              type: 'SCALE',
              value: scaleValue,
            },
            format: 'PNG',
          };

      const bytes = await node.exportAsync(updatedSettings);

      const { width, height, name } = node;
      const sizeInBytes = bytes.length;
      const sizeInKB = sizeInBytes / 1024;

      const imageInfo: ImageInfo = {
        uuid: generateUUID(),
        name,
        width,
        height,
        setting: updatedSettings,
        format: updatedSettings.format,
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
