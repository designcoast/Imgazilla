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
  public collectNodesAsync(node: BaseNode): void {
    this.processNode(node, () => {
      if (this.imageInfos.length > 0) {
        this.options.onChunkProcessed(this.imageInfos);
      }
      this.options.onCompleted();
    });
  }

  private processNode(node: BaseNode, callback: () => void): void {
    setTimeout(async () => {
      if (node.type === 'RECTANGLE' && (node.fills as Paint[]).some(fill => fill.type === 'IMAGE' && fill.imageHash)) {
        const image = figma.getImageByHash((node.fills[0] as ImagePaint).imageHash);

        const bytes = await image.getBytesAsync();
        this.processImage(bytes, node);

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

  private processImage(imageData: Uint8Array, node: RectangleNode): void {
    try {
      const { width, height, name } = node;
      // const sizeInMB = imageData.length / 1_000_000;
      // Get the size in bytes
      const sizeInBytes = imageData.length;
      const sizeInKB = sizeInBytes / 1024;

      // TODO Create general image info object, and make it more flexible
      const imageInfo: ImageInfo = {
        uuid: generateUUID(),
        width,
        height,
        extension: 'png',
        uintArray: imageData,
        optimizationPercent: 100,
        isSelected: false,
        size: sizeInKB,
        name
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
}
