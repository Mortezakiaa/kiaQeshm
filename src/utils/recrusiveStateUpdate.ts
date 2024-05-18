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

