"use client";
import { forwardRef, useState } from "react";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RTLTextField from "./RTLTextField";
import { InsertCustomer } from "@/Types/Types";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddNewCustomer() {
  const [open, setOpen] = useState(false);
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
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Customer/Insert`,
        customer
      );
      const data = await res.data;
      toast.success("علمیات با موفقیت انجام شد");
      handleClose()
    } catch (error) {
      console.log(error);

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
            <Button onClick={addNewCustomer} variant="contained">
              تایید
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}
const Backdrop = forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
};

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 5px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);
