import { assertNotEquals } from "https://deno.land/std@0.121.0/testing/asserts.ts";

import { getListToTree, getTreeToList, TreeNode } from "./lib.ts";

Deno.test("testing", (): void => {
  const testTreeNodes: TreeNode[] = [
    {
      id: "1",
      parentId: null,
      ord: 1,
      type: "imageAndText",
      settings: {},
      data: {},
      children: [
        {
          id: "2",
          parentId: "1",
          ord: 2,
          type: "image",
          settings: {},
          data: {},
          children: [],
        },
        {
          id: "3",
          parentId: "1",
          ord: 1,
          type: "text",
          settings: {},
          data: {},
          children: [],
        },
      ],
    },
  ];

  const testListNodes = getTreeToList(testTreeNodes);
  const testTreeNodesCopy = getListToTree(testListNodes);

  assertNotEquals(testTreeNodes, testTreeNodesCopy);
});
