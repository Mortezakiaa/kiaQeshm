"use client";
import { KalaTreeViewList } from "@/Types/Types";
import { styled, alpha } from "@mui/material/styles";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import IndeterminateCheckBoxRoundedIcon from "@mui/icons-material/IndeterminateCheckBoxRounded";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import { getKalaTree } from "@/utils/getTreeViewList";

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.content}`]: {
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginRight: 15,
    paddingRight: 18,
    borderRight: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

function ExpandIcon(props: React.PropsWithoutRef<typeof AddBoxRoundedIcon>) {
  return <AddBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />;
}

function CollapseIcon(
  props: React.PropsWithoutRef<typeof IndeterminateCheckBoxRoundedIcon>
) {
  return <IndeterminateCheckBoxRoundedIcon {...props} sx={{ opacity: 0.8 }} />;
}

function EndIcon(
  props: React.PropsWithoutRef<typeof DisabledByDefaultRoundedIcon>
) {
  return <DisabledByDefaultRoundedIcon {...props} sx={{ opacity: 0.3 }} />;
}

export default function TreeViewKalaList() {
  const [TreeViewList, setTreeViewList] = useState<KalaTreeViewList[]>();
  const [TreeViewListChildren, setTreeViewListChildren] =
    useState<KalaTreeViewList[]>();

  const getData = async () => {
    const res = await getKalaTree();
    setTreeViewList(res);
  };

  useEffect(()=>{
    getData()
  },[])


  const getKalaTreeViewListChildren = async (id: number | string) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Kala/GetTreeViewChildren/${id}`
      );
      const data = res.data;
      setTreeViewListChildren(data);
    } catch (error) {
      toast.error("مشکلی پیش آمده است. لطفا مجدد تلاش کنید!!");
    }
  };

  return (
    <>
      <SimpleTreeView
        aria-label="customized"
        slots={{
          expandIcon: ExpandIcon,
          collapseIcon: CollapseIcon,
          endIcon: EndIcon,
        }}
        sx={{ overflowX: "hidden", flexGrow: 1, maxWidth: 300 }}
      >
        {TreeViewList?.map((items) => (
          <CustomTreeItem
            key={items.id}
            itemId={items.id.toString()}
            label={items.name}
            onClick={(e) => getKalaTreeViewListChildren(items.id)}
          />
        ))}
      </SimpleTreeView>
    </>
  );
}
