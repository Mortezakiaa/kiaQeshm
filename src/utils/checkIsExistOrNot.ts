import { TreeViewList } from "@/Types/Types";


export const checkIsExistOrNot = (data: TreeViewList[], id: number | string) => {
  return data.some((i) => {
    if (i.id == id) {
      if(i.children.length > 0){
        return true
      }
    } else{
      checkIsExistOrNot(i.children , id)
    }
  });
};
