"use client";
import { TreeViewList } from "@/Types/Types";
import { CustomTreeItem } from "./CustomTreeItem";

export type data = {
  data: TreeViewList[] | undefined;
  getKala: (id: string | number) => void;
};

export const RecrusiveTreeView = ({ data, getKala }: data) => {
  return (
    <>
      {data?.map((i) => (
        <CustomTreeItem
          id={i.id.toString()}
          itemId={i.id.toString()}
          label={i.name}
          onClick={(e) => getKala(i.id)}
        >
          {i.children.length > 0 && (
            <RecrusiveTreeView
              data={i.children}
              getKala={(e) => {
                getKala(e);
              }} />
          )}
        </CustomTreeItem>
      ))}
    </>
  );
};
