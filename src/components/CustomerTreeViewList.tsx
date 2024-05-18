"use client";
import { TreeViewList } from "@/Types/Types";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RecrusiveTreeView } from "./RecrusiveTreeView";
import { recrusiveStateUpdate } from "@/utils/recrusiveStateUpdate";
import { checkIsExistOrNot } from "@/utils/checkIsExistOrNot";
import { CollapseIcon, EndIcon, ExpandIcon } from "./CustomTreeItem";
import { useDispatch } from "react-redux";
import { customerCode, customerName } from "@/StateManagment/Slices/OrderSlice";
import { setIsOpen } from "@/StateManagment/Slices/CustomerTreeView";
import ApiService from "@/utils/axios";

export default function CustomerTreeViewList() {
  const [TreeViewList, setTreeViewList] = useState<TreeViewList[] | any>();
  const [defaultExpanded, setDefaultExpanded] = useState<string[]>([]);
  const dispatch = useDispatch()

  const getCustomerList = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Markaz1/SearchTreeView`)
      .then((res) => {
        res.data.map((i: any) => (i.children = []));
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
    if(!defaultExpanded.includes(id.toString())){
      setDefaultExpanded([...defaultExpanded , id.toString()]);
    }else{
      const expandedItems = defaultExpanded.filter(i => i != id)
      setDefaultExpanded(expandedItems);
      return
    }
    
    const x = checkIsExistOrNot(TreeViewList,id)
   console.log(x);
   
   
        
    const data:any = await ApiService.get(`/Markaz1/GetTreeViewChildren/${id}`)
    const duplicate = data?.some((x: any) => x.id === id);
    if (duplicate || data?.length == 0) return;
    data?.map((i: any) => (i.children = []));
    data.map((i:any) => i.isExist = true)
    const newData = await recrusiveStateUpdate(TreeViewList, data, id);
    setTreeViewList(newData);
    setDefaultExpanded([...defaultExpanded , id.toString()]);
  };

  const onSelectCustomer = (i:TreeViewList)=>{
    if(i.childCount == 0) {
      dispatch(customerCode(i.code))
      dispatch(customerName(i.name))
      dispatch(setIsOpen(false))
    }
  }

  return (
    <>
      <SimpleTreeView
        expandedItems={defaultExpanded}
        slots={{
          expandIcon: ExpandIcon,
          collapseIcon:CollapseIcon,
          endIcon: ExpandIcon,
        }}
        sx={{ overflowX: "hidden", flexGrow: 1, maxWidth: 300 }}
      >
        <RecrusiveTreeView
          Select={onSelectCustomer}
          getKala={getCustomerTreeViewChildrenList}
          data={TreeViewList}
        />
      </SimpleTreeView>
    </>
  );
}
