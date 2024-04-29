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
import { useContext, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import { OrderContext } from "@/Provider/OrderProvider";
import { OrderLines } from "@/Types/Types";

export default function EditableTable() {
  const [editMode, setEditMode] = useState(false);
  const { state, dispatch } = useContext<any>(OrderContext);

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440, width: "100%", overflow: "auto" }}>
        <Table
          stickyHeader
          style={{ overflow: "auto" }}
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
            {state.orderLines?.map((items:OrderLines) => (
              <TableRow key={items.id}>
                <TableCell align="right">{items.itemCode}</TableCell>
                <TableCell align="right">{items.qty1}</TableCell>
                <TableCell align="right">{items.fee}</TableCell>
                <TableCell align="right">{items.amount}</TableCell>
                <TableCell align="right">{items.discountPercent}</TableCell>
                <TableCell align="right">{items.discountAmount}</TableCell>
                <TableCell align="right">{items.remindNet}</TableCell>
                <TableCell align="right">
                  {!editMode ? (
                    <>
                      <Tooltip title="حذف">
                        <IconButton color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="ویرایش">
                        <IconButton
                          color="success"
                          onClick={() => setEditMode(true)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  ) : null}
                  {editMode ? (
                    <>
                      <Tooltip title="انصراف">
                        <IconButton
                          color="error"
                          onClick={() => setEditMode(false)}
                        >
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="تایید">
                        <IconButton color="success">
                          <CheckIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
