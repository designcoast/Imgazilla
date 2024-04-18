
export class RelaunchDataManager {

  public setRelaunchDataForAllImages(): void {
    const processNode = (node: BaseNode) => {
      if (node.type === 'RECTANGLE' && (node.fills as Paint[]).some(fill => fill.type === 'IMAGE' && fill.imageHash)) {
        node.setRelaunchData({ favicon: 'Export favicon from selected image' });
      }

      if ('children' in node) {
        node.children.forEach(processNode);
      }
    };

    figma.currentPage.children.forEach(processNode)
  }
}