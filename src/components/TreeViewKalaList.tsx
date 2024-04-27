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
import SortedTreeList from "@/utils/SortedTreeList";

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
  const [number, setNumber] = useState(0);

  const getKalaTree = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Kala/SearchTreeView`)
      .then((res) => {
        res.data.map((i: any) => (i.children = []));
        setTreeViewList(res.data);
      })
      .catch((e) => {
        console.log(e);
        toast.error("");
      });
  };

  useEffect(() => {
    getKalaTree();
  }, []);

  const recrusiveStateUpdate = async (
    state: KalaTreeViewList[] | undefined,
    data: KalaTreeViewList[],
    id: string | number
  ) => {
    state?.forEach((item) => {
      if (item.id === id) {
        item.children = data;
      } else {
        recrusiveStateUpdate(item.children, data, id);
      }
    });
    setTreeViewList(state);
    setNumber((prev) => ++prev);
  };

  const getKalaTreeViewListChildren = async (id: number | string) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Kala/GetTreeViewChildren/${id}`
      );
      const data = res.data;
      res.data.map((i: any) => (i.children = []));
      await recrusiveStateUpdate(TreeViewList, data, id);
    } catch (error) {
      toast.error("مشکلی پیش آمده است. لطفا مجدد تلاش کنید!!");
    }
  };

  return (
    <>
      <SimpleTreeView
        slots={{
          expandIcon: ExpandIcon,
          collapseIcon: CollapseIcon,
          endIcon: EndIcon,
        }}
        sx={{ overflowX: "hidden", flexGrow: 1, maxWidth: 300 }}
      >
        <RecrusiveTreeView
          getKala={getKalaTreeViewListChildren}
          data={TreeViewList}
        />
      </SimpleTreeView>
    </>
  );
}

type data = {
  data: KalaTreeViewList[] | undefined;
  getKala: (id: string | number) => void;
};

const RecrusiveTreeView = ({ data, getKala }: data) => {
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
              }}
            />
          )}
        </CustomTreeItem>
      ))}
    </>
  );
};
