export class ImageUintArrayCollector {
  private uintArray: Uint8Array[];
  private readonly onDone: () => void;

  constructor(onDone: () => void) {
    this.uintArray = [];
    this.onDone = onDone;
  }

  /**
   * Asynchronously collect all nodes that are PNGs to avoid UI freeze.
   */
  public collectNodesAsync(node: BaseNode): void {
    this.processNode(node, () => {
      if (this.onDone) {
        this.onDone();
      }
    });
  }

  private processNode(node: BaseNode, callback: () => void): void {
    // Using requestAnimationFrame to keep the UI responsive
    setTimeout(async () => {
      if (node.type === 'RECTANGLE' && (node.fills as Paint[]).some(fill => fill.type === 'IMAGE' && fill.imageHash)) {
        const image = figma.getImageByHash((node.fills[0] as ImagePaint).imageHash);
        const bytes = await image.getBytesAsync();
        this.uintArray.push(bytes);
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
