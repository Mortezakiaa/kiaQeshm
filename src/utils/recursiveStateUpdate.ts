import { TreeViewList } from "@/Types/Types";

export const recursiveStateUpdate = (
  state: TreeViewList[] | undefined,
  data: any,
  id: number | string
) => {
  state?.forEach((item) => {
    if (item.id === id) {
      item.children = [...item.children, ...data.rows];
      item.totalItems = data.totalItems;
    } else {
      recursiveStateUpdate(item.children, data, id);
    }
  });
  return state;
};

export const isCompletedTreeItems = (
  data: TreeViewList[],
  id: number | string
): boolean => {
  return data?.some((item) => {
    if (item.id == id) {
      if (item.totalItems == item.children.length) {
        return true;
      }
    } else {
      return isCompletedTreeItems(item.children, id);
    }
  });
};
