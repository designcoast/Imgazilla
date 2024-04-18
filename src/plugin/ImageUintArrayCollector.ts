import { extractPngDimensions } from '@/plugin/utils/extractPngDimensions';
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
        this.processImage(bytes, node.name);

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

  private processImage(imageData: Uint8Array, name: string): void {
    try {
      const dimensions = extractPngDimensions(imageData);

      const imageInfo: ImageInfo = {
        uuid: generateUUID(),
        width: dimensions.width,
        height: dimensions.height,
        extension: 'png',
        uintArray: imageData,
        name: name
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
