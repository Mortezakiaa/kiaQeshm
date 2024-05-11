"use client";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";
import { useContext } from "react";
import { OrderContext } from "@/Provider/OrderProvider";
import { OrderLines } from "@/Types/Types";
import { sp } from "@/utils/SeperateNumber";
import { OrderLinesContext } from "@/Provider/OrderLinesProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  OrderLinesSelector,
  discountPercent,
  fee,
  itemCode,
  itemName,
  qty1,
} from "@/StateManagment/Slices/OrderLinesSlice";
import {
  OrderSelector,
  deleteRecord,
  editId,
  editMode,
} from "@/StateManagment/Slices/OrderSlice";

export default function EditableTable() {
  const OrderStore = useSelector(OrderSelector);
  const OrderLinesStore = useSelector(OrderLinesSelector);
  const dis = useDispatch();

  const { state, dispatch } = useContext<any>(OrderContext);
  const ctx = useContext<any>(OrderLinesContext);

  const Edit = (id: number | null) => {
    const data = OrderStore.orderLines?.filter((i: OrderLines) => {
      if (i.id === id) return i;
    });
    dis(qty1(data[0].qty1));
    dis(fee(data[0].fee));
    dis(discountPercent(data[0].discountPercent));
    dis(itemCode(data[0].itemCode));
    dis(itemName(data[0].itemName));
    dis(editMode(true));
    dis(editId(id));
    // ctx.dispatch({type:'qty1' , payload:data[0].qty1})
    // ctx.dispatch({type:'fee' , payload:data[0].fee})
    // ctx.dispatch({type:'discountPercent' , payload:data[0].discountPercent})
    // ctx.dispatch({type:'itemCode' , payload:data[0].itemCode})
    // ctx.dispatch({type:'itemName' , payload:data[0].itemName})
    // dispatch({type:'editMode' , payload:true})
    // dispatch({type:'editId' , payload:id})
  };

  return (
    <Paper>
      <TableContainer
        sx={{
          maxHeight: 440,
          maxWidth: "100%",
          width: "100%",
          overflowX: "auto",
        }}
      >
        <Table
          stickyHeader
          style={{ overflowX: "auto" }}
          sx={{
            "& th": {
              backgroundColor: "#424242",
              color: "white",
              padding: "8px 6px",
            },
            "& td": {
              padding: "6px",
              border: "1px solid rgba(184 183 183)",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="right">نام کالا</TableCell>
              <TableCell align="right">تعداد</TableCell>
              <TableCell align="right">قیمت</TableCell>
              <TableCell align="right">مبلغ</TableCell>
              <TableCell align="right">درصد تخفیف</TableCell>
              <TableCell align="right">مبلغ تخفیف</TableCell>
              <TableCell align="right">مانده</TableCell>
              <TableCell align="right">وضعیت</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& tr:nth-child(even)": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            {OrderStore.orderLines?.map((items: OrderLines) => (
              <TableRow key={items.id}>
                <TableCell align="right">{items.itemName}</TableCell>
                <TableCell align="right">{items.qty1}</TableCell>
                <TableCell align="right">{sp(items.fee)}</TableCell>
                <TableCell align="right">{sp(items.amount)}</TableCell>
                <TableCell align="right">{items.discountPercent}</TableCell>
                <TableCell align="right">{sp(items.discountAmount)}</TableCell>
                <TableCell align="right">{sp(items.remindNet)}</TableCell>
                <TableCell align="right">
                  <Tooltip title="حذف">
                    <IconButton
                      color="error"
                      onClick={() => {
                        // dispatch({ type: "deleteRecord", payload: items.id });
                        dis(deleteRecord(items.id));
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="ویرایش">
                    <IconButton
                      color="success"
                      onClick={() => {
                        Edit(items.id);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
