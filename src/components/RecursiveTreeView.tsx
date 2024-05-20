"use client";
import { TreeViewList } from "@/Types/Types";
import { CustomTreeItem } from "./CustomTreeItem";

export type data = {
  data: TreeViewList[] | undefined;
  getKala: (id: number | string) => void;
  Select: (i: TreeViewList) => void;
  Ref: any;
};

export const RecursiveTreeView = ({ data, getKala, Select, Ref }: data) => {
  return (
    <>
      {data?.map((i) => (
        <CustomTreeItem
          sx={{
            "& .MuiTreeItem-iconContainer": {
              display: `${i.childCount == 0 && "none"}`,
            },
          }}
          key={i.id}
          itemId={i.id.toString()}
          label={i.name}
          onClick={() => {
            getKala(i.id);
          }}
          onDoubleClick={(e) => {
            Select(i);
          }}
        >
          {i.children.length > 0 && (
            <>
              <RecursiveTreeView
                Ref={Ref}
                Select={Select}
                data={i.children}
                getKala={(e) => {
                  getKala(e);
                }}
              />
            </>
          )}
        </CustomTreeItem>
      ))}
      <div ref={Ref}></div>
    </>
  );
};
