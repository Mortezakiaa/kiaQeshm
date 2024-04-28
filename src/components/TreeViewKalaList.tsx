"use client";
import { KalaTreeViewList } from "@/Types/Types";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import IndeterminateCheckBoxRoundedIcon from "@mui/icons-material/IndeterminateCheckBoxRounded";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import { RecrusiveTreeView } from "./RecrusiveTreeView";
import { recrusiveStateUpdate } from "@/utils/recrusiveStateUpdate";

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
        toast.error("مشکلی پیش آمده است مجدد امتحان کنید");
      });
  };

  useEffect(() => {
    getKalaTree();
  }, []);

  const getKalaTreeViewListChildren = async (id: number | string) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Kala/GetTreeViewChildren/${id}`
      );
      const data = res.data;
      if (data.length == 0) return;
      res.data.map((i: any) => (i.children = []));
      const newData = await recrusiveStateUpdate(TreeViewList, data, id);
      setTreeViewList(newData);
      setNumber((prev) => ++prev);
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
