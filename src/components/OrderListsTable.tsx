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
import Pagination from "@mui/material/Pagination";
import { Box, Typography } from "@mui/material";

export interface Data {
  data: OrderLists[];
}

export default function OrderListsTable({ data }: Data) {
  const [dataCount, setDataCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(dataCount);

  useEffect(() => {
    setDataCount(data.length);
    setRowsPerPage(Math.ceil(data.length / 10));
  }, [data]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
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
              <TableCell align="right">*</TableCell>
              <TableCell align="right">کد مشتری</TableCell>
              <TableCell align="right">نام مشتری</TableCell>
              <TableCell align="right">تاریخ</TableCell>
              <TableCell align="right">نام نوع فاکتور</TableCell>
              <TableCell align="right">نام انبار</TableCell>
              <TableCell align="right">شماره سفارش</TableCell>
              <TableCell align="right">شماره 2</TableCell>
              <TableCell align="right">تاریخ 2</TableCell>
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
            {data?.map((i, index) => (
              <TableRow key={i.id}>
                <TableCell align="right">{++index}</TableCell>
                <TableCell align="right">{i.customerCode}</TableCell>
                <TableCell align="right">{i.customerName}</TableCell>
                <TableCell align="right">{i.date}</TableCell>
                <TableCell align="right">{i.nameFaktorType}</TableCell>
                <TableCell align="right">{i.nameAnbar}</TableCell>
                <TableCell align="right">{i.num1}</TableCell>
                <TableCell align="right">{i.num2}</TableCell>
                <TableCell align="right">{i.date2}</TableCell>
                <TableCell
                  sx={{ maxWidth: "150px", wordBreak: "break-word" }}
                  align="right"
                >
                  {i.sharh}
                </TableCell>
                <TableCell
                  sx={{ maxWidth: "150px", wordBreak: "break-word" }}
                  align="right"
                >
                  {i.tozihat}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Box sx={{display:'flex' , gap:'5px' , alignItems:'center', flexDirection:'row-reverse'}}>
        <Pagination dir="ltr" count={rowsPerPage} />
        <Typography variant="caption">صفحه : {rowsPerPage}</Typography>
      </Box> */}
      {/* <TablePagination
        id="table-Pagination"
        style={{ display: "flex" }}
        dir="ltr"
        rowsPerPageOptions={[]}
        labelRowsPerPage={``}
        component="div"
        count={dataCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      /> */}
    </Paper>
  );
}
