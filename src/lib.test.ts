import { assertEquals } from 'https://deno.land/std@0.121.0/testing/asserts.ts';

import { getListToTree, getTreeToList, TreeNode } from './lib.ts';

Deno.test('testing ', () => {
  const testTreeNodes: TreeNode[] = [
    {
      id: '1',
      parentId: null,
      type: 'imageAndText',
      data: {},
      children: [
        {
          id: '2',
          parentId: '1',
          type: 'image',
          data: {},
          children: [],
        },
        {
          id: '3',
          parentId: '1',
          type: 'text',
          data: {},
          children: [],
        },
      ],
    },
  ];

  const testListNodes = getTreeToList(testTreeNodes);
  const testTreeNodesCopy = getListToTree(testListNodes);

  assertEquals(testTreeNodes, testTreeNodesCopy);
});
