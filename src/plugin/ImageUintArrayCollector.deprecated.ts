export class ImageUintArrayCollector {
  private uintArray: Uint8Array[] = [];

  async collectUintArrayImages(nodes: BaseNode[]) {
    for (const node of nodes) {
      if (node.type === 'RECTANGLE' && (node.fills as Paint[]).some(fill => fill.type === 'IMAGE' && fill.imageHash)) {

        const image = figma.getImageByHash((node.fills[0] as ImagePaint).imageHash);
        const bytes = await image.getBytesAsync();

        console.log('bytes', bytes);

        // const uintArray = await node.exportAsync({
        //   format: "PNG",
        //   suffix: "",
        //   contentsOnly: true,
        //   constraint: {
        //     type: "WIDTH",
        //     value: 300,
        //   }
        // });
        //
        this.uintArray.push(bytes);
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