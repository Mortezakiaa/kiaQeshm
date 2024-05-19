import { TreeViewList } from "@/Types/Types";

export const recrusiveStateUpdate = async (
  state: TreeViewList[] | undefined,
  data: TreeViewList[],
  id: string | number
) => {
  state?.forEach((item) => {
    if (item.id === id) {
      item.children = data;
    } else {
      recrusiveStateUpdate(item.children, data, id);
    }
  });
  return state;
};

export const isTreeExist = (data: TreeViewList[], id: number | string): boolean => {
  return data?.some((item) => {
    if (item.id == id) {
      if (item.children.length > 0) {
        return true;
      }
    } else {
      return isTreeExist(item.children, id);
    }
  });
};
