'use client'
import { getCookie } from "@/actions/getCookie";
import { alpha, styled } from "@mui/material";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view";
import { redirect } from "next/navigation";
import data from './data.json'
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
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


type x = {data:any}
const Tr = ({data}:x)=>{
  return (
    <>
      {data?.map((i:any)=>(
        <CustomTreeItem itemId={i.id} label={i.name} onClick={(e) => {console.log(i.name , i.id)}}>
          {i.children.length > 0 && <Tr data={i.children}/>}
        </CustomTreeItem>
      ))}
    </>
  )
}

export default function Home() {
  // const cookie = await getCookie()
  // if(!cookie) redirect('/Login')
  // else redirect('/Order')

  return(
    <>
    <SimpleTreeView>
      <Tr data={data}/>
    </SimpleTreeView>
    </>
  )
}
