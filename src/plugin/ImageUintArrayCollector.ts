export class ImageUintArrayCollector {
  private uintArray: Uint8Array[] = [];

  async collectUintArrayImages(nodes: BaseNode[]) {
    for (const node of nodes) {
      if (node.type === 'RECTANGLE') {

        const uintArray = await node.exportAsync({
          format: "PNG",
          suffix: "",
          contentsOnly: true,
          constraint: {
            type: "WIDTH",
            value: 300,
          }
        });

        this.uintArray.push(uintArray);
      }
    }
  }

  getUintArrayImages(): Uint8Array[] {
    return this.uintArray;
  }

  clearUintArrayImages(): void {
    this.uintArray = [];
  }
}