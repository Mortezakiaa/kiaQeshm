"use client";
import { TreeViewList } from "@/Types/Types";
import { CustomTreeItem } from "./CustomTreeItem";
import { Box } from "@mui/material";
import Spinner from "./Spinner";

export type data = {
  data: TreeViewList[] | undefined;
  getTreeItems: (id: number | string) => void;
  selectTreeItems: (i: TreeViewList) => void;
  Ref: any;
};

export const RecursiveTreeView = ({
  data,
  getTreeItems,
  selectTreeItems,
  Ref,
}: data) => {
  return (
    <>
      {data?.map((i: TreeViewList , index) => (
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
            getTreeItems(i.id);
          }}
          onDoubleClick={(e) => {
            selectTreeItems(i);
          }}
        >
          {i.childCount > 0 && (
            <>
              <RecursiveTreeView
                Ref={Ref}
                selectTreeItems={selectTreeItems}
                data={i.children}
                getTreeItems={(e) => {
                  getTreeItems(e);
                }}
              />
            </>
          )}
          {i.totalItems > i.children.length && (
            <Box sx={{ display: "flex", justifyContent: "center" }} ref={Ref}>
              <Spinner/>
            </Box>
          )}
        </CustomTreeItem>
      ))}
    </>
  );
};
