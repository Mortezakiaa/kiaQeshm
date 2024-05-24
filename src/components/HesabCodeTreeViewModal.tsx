"use client";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Grid,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { ModalContent, StyledBackdrop, style } from "./ModalPropertys";
import { useDispatch } from "react-redux";
import { reset } from "@/StateManagment/Slices/InfiniteTreeView";
import HesabCodeTreeViewList from "./HesabCodeTreeViewList";

export default function HesabCodeTreeViewModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Tooltip title="نمایش کد حساب">
        <IconButton
          onClick={() => {
            handleOpen();
            dispatch(reset());
          }}
        >
          <FormatListBulletedIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent
          sx={[
            style,
            { minWidth: "40%", overflowY: "scroll", maxHeight: "450px" },
          ]}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" color={"black"}>
              لیست کد حسابها
            </Typography>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid display={"flex"} flexDirection={"column"} container spacing={2}>
            <HesabCodeTreeViewList />
          </Grid>
        </ModalContent>
      </Modal>
    </>
  );
}
