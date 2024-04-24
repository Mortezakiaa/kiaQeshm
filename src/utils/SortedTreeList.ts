import { KalaTreeViewList } from "@/Types/Types"

export default function SortedTreeList(TreeList:KalaTreeViewList[]){
    const Sorted:any = {}
    TreeList.map((ls)=>{
        if(!Sorted[ls.code]) Sorted[ls.code] = [] 
        Sorted[ls.code].push(ls)
    })
    return Sorted
}