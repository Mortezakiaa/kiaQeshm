"use client";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { OrderLists } from "@/Types/Types";
import { sp } from "@/utils/SeperateNumber";

export interface Data {
  data: OrderLists[];
}

export default function OrderListsTable({ data }: Data) {
  const [Rows, setRows] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setRows(data.length);
  }, [data]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{
            "& th": {
              backgroundColor: "#424242",
              color: "white",
              padding: "8px 6px",
            },
            "& td": {
              padding: "8px 6px",
              border: "1px solid rgba(184 183 183)",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="right">ردیف</TableCell>
              <TableCell align="right">کد مشتری</TableCell>
              <TableCell align="right">نام مشتری</TableCell>
              <TableCell align="right">تاریخ</TableCell>
              <TableCell align="right">نام انبار</TableCell>
              <TableCell align="right">تعداد</TableCell>
              <TableCell align="right">مقدار</TableCell>
              <TableCell align="right">مبلغ</TableCell>
              <TableCell align="right">باقیمانده</TableCell>
              <TableCell align="right">شرح</TableCell>
              <TableCell align="right">توضیحات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& tr:nth-child(even)": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((i) => (
              <TableRow hover key={i.rowNumber}>
                <TableCell align="right">{i.rowNumber}</TableCell>
                <TableCell align="right">{i.customerCode}</TableCell>
                <TableCell align="right">{i.customerName}</TableCell>
                <TableCell align="right">{i.date}</TableCell>
                <TableCell align="right">{i.nameAnbar}</TableCell>
                <TableCell align="right">{i.num1}</TableCell>
                <TableCell align="right">{sp(i.fee)}</TableCell>
                <TableCell align="right">{sp(i.amount)}</TableCell>
                <TableCell align="right">{sp(i.remindNet)}</TableCell>
                <TableCell
                  sx={{ maxWidth: "150px", wordBreak: "break-word" }}
                  align="right"
                >
                  {i.description1}
                </TableCell>
                <TableCell
                  sx={{ maxWidth: "150px", wordBreak: "break-word" }}
                  align="right"
                >
                  {i.description2}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        style={{ display: "flex" }}
        dir="ltr"
        rowsPerPageOptions={[10 , 25 , 50]}
        labelRowsPerPage={``}
        component="div"
        count={Rows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
