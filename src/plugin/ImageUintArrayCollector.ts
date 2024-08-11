import { generateUUID } from '@/plugin/utils/generateUUID';

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

  /**
   * Asynchronously collect all nodes that are PNGs to avoid UI freeze.
   */

  public collectNodesFromSelection(selection: BaseNode[]): void {
    if (selection.length === 1) {
      // Single node selected
      const singleNode = selection[0];
      if (this.isExportableNode(singleNode)) {
        this.processNode(singleNode, () => {
          if (this.imageInfos.length > 0) {
            this.options.onChunkProcessed(this.imageInfos);
          }
          this.options.onCompleted();
        });
      } else {
        this.options.onCompleted();
      }
    } else if (selection.length > 1) {
      // Multiple nodes selected
      this.processNodes(selection, () => {
        if (this.imageInfos.length > 0) {
          this.options.onChunkProcessed(this.imageInfos);
        }
        this.options.onCompleted();
      });
    } else {
      this.options.onCompleted();
    }
  }

  public collectNodesAsync(node: BaseNode): void {
    this.processNode(node, () => {
      if (this.imageInfos.length > 0) {
        this.options.onChunkProcessed(this.imageInfos);
      }
      this.options.onCompleted();
    });
  }

  private processNode(node: any, callback: () => void): void {
    setTimeout(async () => {
      const { exportSettings } = node;
      for (let setting of exportSettings) {

        await this.processImage(node, setting);

        if (this.imageInfos.length >= this.options.chunkSize) {
          this.options.onChunkProcessed([...this.imageInfos]);
          this.imageInfos = [];
        }
      }

      if ("children" in node) {
        this.processChildren(node.children, callback);
      } else {
        callback();
      }
    }, 0);
  }

  private processNodes(nodes: BaseNode[], callback: () => void): void {
    const processNext = (index: number) => {
      if (index < nodes.length) {
        this.processNode(nodes[index], () => processNext(index + 1));
      } else {
        callback();
      }
    };

    processNext(0);
  }

  private processChildren(children: ReadonlyArray<any>, callback: () => void): void {
    const processNext = (index: number) => {
      if (index < children.length) {
        this.processNode(children[index], () => processNext(index + 1));
      } else {
        callback();
      }
    };

    processNext(0);
  }

  private async processImage(node: RectangleNode, setting: ExportSettings): Promise<void> {
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
      console.log(`ERROR: ${e.message}`);
    }
  }

  /**
   * Get all collected PNG nodes.
   */
  public getImageInfoArray(): ImageInfo[] {
    return this.imageInfos;
  }

  public clear(): void {
    this.imageInfos = [];
  }

  private isExportableNode(node: BaseNode): boolean {
    return node.type === 'RECTANGLE' || node.type === 'FRAME' || 'exportSettings' in node;
  }
}
