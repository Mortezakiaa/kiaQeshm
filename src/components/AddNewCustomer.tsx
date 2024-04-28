"use client";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Grid, IconButton, Modal, Tooltip, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RTLTextField from "./RTLTextField";
import { InsertCustomer } from "@/Types/Types";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { ModalContent, StyledBackdrop, style } from "./ModalPropertys";

export default function AddNewCustomer() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState<InsertCustomer>({
    codeMoshtari: "",
    name: "",
    address: "",
    tell: "",
    mobile: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addNewCustomer = async () => {
    if (!customer.codeMoshtari) {
      toast.error("کد مشتری را وارد کنید");
      return;
    }
    if (!customer.name) {
      toast.error("نام مشتری را وارد کنید");
      return;
    }
    if (!customer.address) {
      toast.error("آدرس را وارد کنید");
      return;
    }
    if (!customer.tell) {
      toast.error("تلفن را وارد کنید");
      return;
    }
    if (!customer.mobile) {
      toast.error("شماره تلفن را وارد کنید");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Customer/Insert`,
        customer
      );
      const data = await res.data;
      setLoading(false);
      toast.success("علمیات با موفقیت انجام شد");
      handleClose();
    } catch (error) {
      setLoading(false);
      toast.error("خطایی پیش آمده است لطفا مجدد امتحان کنید");
    }
  };

  return (
    <>
      <Tooltip title="اضافه کردن مشتری جدید">
        <IconButton aria-label="delete" onClick={handleOpen}>
          <AddBoxIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={[style, { minWidth: "40%" }]}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" color={"black"}>
              وارد کردن مشتری جدید
            </Typography>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid display={"flex"} flexDirection={"column"} container spacing={2}>
            <Grid item sm={12} md={12}>
              <RTLTextField
                fullWidth
                onChange={(e) => {
                  setCustomer({ ...customer, codeMoshtari: e.target.value });
                }}
                value={customer.codeMoshtari}
                label="کد مشتری"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item sm={12} md={12}>
              <RTLTextField
                fullWidth
                onChange={(e) => {
                  setCustomer({ ...customer, name: e.target.value });
                }}
                value={customer.name}
                label="نام مشتری"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item sm={12} md={12}>
              <RTLTextField
                fullWidth
                onChange={(e) => {
                  setCustomer({ ...customer, address: e.target.value });
                }}
                value={customer.address}
                label="آدرس"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item sm={12} md={12}>
              <RTLTextField
                fullWidth
                onChange={(e) => {
                  setCustomer({ ...customer, tell: e.target.value });
                }}
                value={customer.tell}
                type="number"
                label="تلفن"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item sm={12} md={12}>
              <RTLTextField
                fullWidth
                onChange={(e) => {
                  setCustomer({ ...customer, mobile: e.target.value });
                }}
                value={customer.mobile}
                type="number"
                label="تلفن همراه"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>
          <Box>
            {loading ? (
              <Spinner />
            ) : (
              <Button onClick={addNewCustomer} variant="contained">
                تایید
              </Button>
            )}
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}

