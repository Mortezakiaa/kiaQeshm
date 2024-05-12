"use client";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Grid, IconButton, Modal, Tooltip, Typography } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { ModalContent, StyledBackdrop, style } from "./ModalPropertys";
import CustomerTreeViewList from "./CustomerTreeViewList";
import { useDispatch, useSelector } from "react-redux";
import { CustomerTreeViewModalSelector, setIsOpen } from "@/StateManagment/Slices/CustomerTreeView";

export default function CustomerTreeViewModal() {
  const {isOpenModal} = useSelector(CustomerTreeViewModalSelector)
  const dispatch = useDispatch()
  return (
    <>
      <Tooltip title="نمایش لیست مشتریان">
        <IconButton onClick={() => dispatch(setIsOpen(true))}>
          <FormatListBulletedIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={isOpenModal}
        onClose={() => {dispatch(setIsOpen(false))}}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={[style, { minWidth: "40%" , overflowY:'scroll' , maxHeight:'450px' }]}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" color={"black"}>
              لیست مشتریان 
            </Typography>
            <IconButton aria-label="close" onClick={() => {dispatch(setIsOpen(false))}}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid
            display={"flex"}
            flexDirection={"column"}
            container
            spacing={2}
          >
            <CustomerTreeViewList/>
          </Grid>
        </ModalContent>
      </Modal>
    </>
  );
}
