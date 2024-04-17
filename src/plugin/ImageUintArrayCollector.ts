
interface NodeProcessorOptions {
  chunkSize: number;
  onChunkProcessed: (nodes: Uint8Array[]) => void;
  onCompleted: () => void;
}

export class ImageUintArrayCollector {
  private uintArray: Uint8Array[] = [];
  private options: NodeProcessorOptions;

  constructor(options: NodeProcessorOptions) {
    this.options = options;
  }

  /**
   * Asynchronously collect all nodes that are PNGs to avoid UI freeze.
   */
  public collectNodesAsync(node: BaseNode): void {
    this.processNode(node, () => {
      if (this.uintArray.length > 0) {
        this.options.onChunkProcessed(this.uintArray);
      }
      this.options.onCompleted();
    });
  }

  private processNode(node: BaseNode, callback: () => void): void {
    setTimeout(async () => {
      if (node.type === 'RECTANGLE' && (node.fills as Paint[]).some(fill => fill.type === 'IMAGE' && fill.imageHash)) {
        const image = figma.getImageByHash((node.fills[0] as ImagePaint).imageHash);
        const bytes = await image.getBytesAsync();
        this.uintArray.push(bytes);

        if (this.uintArray.length >= this.options.chunkSize) {
          this.options.onChunkProcessed([...this.uintArray]);
          this.uintArray = [];
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

  /**
   * Get all collected PNG nodes.
   */
  public getUintArray(): Uint8Array[] {
    return this.uintArray;
  }

  public clear(): void {
    this.uintArray = [];
  }
}
