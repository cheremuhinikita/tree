type Nullable<T> = T | null;

export interface Block {
  type: string;
  data: Record<string, unknown>;
}

export interface Template extends Block {
  settings: Record<string, unknown>;
  children: Template[];
}

export interface ListNode extends Block {
  id: string;
  parentId: Nullable<string>;
  ord: number;
  settings: Record<string, unknown>;
}

export interface TreeNode extends Block {
  id: string;
  parentId: Nullable<string>;
  ord: number;
  settings: Record<string, unknown>;
  children: TreeNode[];
}

export interface FinalTreeNode extends Block {
  children: FinalTreeNode[];
}

export const getListToTree = (
  list: ListNode[],
  parentId: Nullable<string> = null
): TreeNode[] =>
  list
    .filter((listNode) => listNode.parentId === parentId)
    .sort((a, b) => a.ord - b.ord)
    .map((listNode) => ({
      ...listNode,
      children: getListToTree(list, listNode.id),
    }));

export const getTreeToList = (tree: TreeNode[]): ListNode[] =>
  tree.reduce(
    (acc, { children, ...treeNode }) => [
      ...acc,
      treeNode,
      ...getTreeToList(children),
    ],
    [] as ListNode[]
  );

export const createTemplate = (
  template: Template,
  parentId: Nullable<string> = null,
  prevOrd = 0
): TreeNode => {
  const id = crypto.randomUUID();

  return {
    ...template,
    id,
    parentId,
    ord: prevOrd + 1,
    children: template.children.map((child, ord) =>
      createTemplate(child, id, ord)
    ),
  };
};

export const cleaningTree = (tree: TreeNode[]): FinalTreeNode[] =>
  tree.map((treeNode) => ({
    type: treeNode.type,
    data: treeNode.data,
    children: cleaningTree(treeNode.children),
  }));
