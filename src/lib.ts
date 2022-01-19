type Nullable<T> = T | null;

export interface Base {
  type: string;
  data: Record<string, unknown>;
}

export interface Template extends Base {
  type: string;
  data: Record<string, unknown>;
  children: Template[];
}

export interface ListNode extends Base {
  id: string;
  parentId: Nullable<string>;
}

export interface TreeNode extends Base {
  id: string;
  parentId: Nullable<string>;
  children: TreeNode[];
}

export const getListToTree = (list: ListNode[], parentId: Nullable<string> = null): TreeNode[] =>
  list
    .filter((listNode) => listNode.parentId === parentId)
    .map((listNode) => ({
      ...listNode,
      children: getListToTree(list, listNode.id),
    }));

export const getTreeToList = (tree: TreeNode[]): ListNode[] =>
  tree.reduce(
    (acc, { children, ...treeNode }) => [...acc, treeNode, ...getTreeToList(children)],
    [] as ListNode[],
  );

export const createTemplate = (template: Template, parentId: Nullable<string> = null): TreeNode => {
  const id = crypto.randomUUID();

  return {
    ...template,
    id,
    parentId,
    children: template.children.map((child) => createTemplate(child, id)),
  };
};
