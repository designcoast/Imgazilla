type Children = readonly SceneNode[] | readonly PageNode[]

export const hasChildren = (node: BaseNode): node is BaseNode & ChildrenMixin =>
  Boolean(node['children'])

export const findAll = (
  nodes: Children,
  iteratee: (elem?: BaseNode, idx?: number, array?: Children) => boolean
) => {
  const result = []
  for (let i = 0; i < nodes.length; i++) {
    if (iteratee(nodes[i], i, nodes)) {
      result.push(nodes[i])
    } else if (hasChildren(nodes[i])) {
      result.push(...findAll(nodes[i]['children'], iteratee))
    }
  }
  return result
}