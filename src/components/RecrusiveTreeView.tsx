"use client";
import { TreeViewList } from "@/Types/Types";
import { CustomTreeItem } from "./CustomTreeItem";

export type data = {
  data: TreeViewList[] | undefined;
  getKala: (id: string | number) => void;
  Select:(i:TreeViewList) => void
};

export const RecrusiveTreeView = ({ data, getKala , Select}: data) => {
  return (
    <>
      {data?.map((i) => (
        <CustomTreeItem
          sx={{
            '& .MuiTreeItem-iconContainer':{
              display:`${i.childCount == 0 && 'none'}`
            }
          }}
          key={i.id}
          itemId={i.id.toString()}
          label={i.name}
          onClick={() => {getKala(i.id)}}
          onDoubleClick={(e) => {Select(i)}}
        >
          {i.children.length > 0 && (
            <RecrusiveTreeView
              Select={Select}
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
