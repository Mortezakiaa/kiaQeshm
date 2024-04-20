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
import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import { InsertOrder } from "@/Types/InsertOrder";

export default function EditableTable() {
  const [editMode, setEditMode] = useState(false);
  const [Insert , setInsert] = useState<InsertOrder>()
  return (
    <Paper sx={{ width: "100%", overflow: "hidden"}}>
      <TableContainer sx={{ maxHeight: 440}}>
        <Table stickyHeader sx={{
          '& th':{
            backgroundColor:'#424242',
            color:'white',
            padding:'8px 6px'
          },
          '& td':{
            padding:'6px',
          }
        }}>
          <TableHead>
            <TableRow>
              <TableCell align="right">*</TableCell>
              <TableCell align="right">نام کالا</TableCell>
              <TableCell align="right">تعداد</TableCell>
              <TableCell align="right">فی</TableCell>
              <TableCell align="right">قیمت قبل تخفیف</TableCell>
              <TableCell align="right">درصد تخفیف</TableCell>
              <TableCell align="right">قیمت تخفیف</TableCell>
              <TableCell align="right">قیمت نهایی</TableCell>
              <TableCell align="right">توضیحات</TableCell>
              <TableCell align="right">وضعیت</TableCell>
            </TableRow>
          </TableHead>
          <TableBody  sx={{
            '& tr:nth-child(even)':{
              backgroundColor:'#e0e0e0',
            },
            }}>
            <TableRow>
              <TableCell align="right"></TableCell>
              <TableCell align="right">d</TableCell>
              <TableCell align="right">das</TableCell>
              <TableCell align="right">das</TableCell>
              <TableCell align="right">da</TableCell>
              <TableCell align="right">das</TableCell>
              <TableCell align="right">da</TableCell>
              <TableCell align="right">da</TableCell>
              <TableCell align="right">da</TableCell>
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
                      <IconButton color="error" onClick={() => setEditMode(false)}>
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
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
