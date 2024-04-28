"use client";
import { TreeViewList } from "@/Types/Types";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RecrusiveTreeView } from "./RecrusiveTreeView";
import { recrusiveStateUpdate } from "@/utils/recrusiveStateUpdate";
import { CollapseIcon, EndIcon, ExpandIcon } from "./CustomTreeItem";

export default function CustomerTreeViewList() {
  const [TreeViewList, setTreeViewList] = useState<TreeViewList[]>();
  const [number, setNumber] = useState(0);

  const getCustomerList = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Markaz1/SearchTreeView`)
      .then((res) => {
        res.data.map((i: any) => (i.children = []));
        console.log(res.data);
        
        setTreeViewList(res.data);
      })
      .catch((e) => {
        toast.error("مشکلی پیش آمده است مجدد امتحان کنید");
      });
  };

  useEffect(() => {
    getCustomerList();
  }, []);

  const getCustomerTreeViewChildrenList = async (id: number | string) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Markaz1/GetTreeViewChildren/${id}`
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
          getKala={getCustomerTreeViewChildrenList}
          data={TreeViewList}
        />
      </SimpleTreeView>
    </>
  );
}
