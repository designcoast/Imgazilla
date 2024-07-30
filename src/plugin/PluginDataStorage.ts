export class PluginDataStorage {

  public setNodeData(node: SceneNode, key: string, value: string): void {
    node.setPluginData(key, value);
  }

  public setCurrentPageData(key: string, value: string): void {
    figma.currentPage.setPluginData(key, value);
  }

  public getCurrentPageData(key: string): string {
    return figma.currentPage.getPluginData(key);
  }

  public async setGlobalData(key: string, value: string): Promise<void> {
    await figma.clientStorage.setAsync(key, value);
  }

  public async getGlobalData(key: string): Promise<string> {
    return await figma.clientStorage.getAsync(key);
  }
}
