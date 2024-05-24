"use client";
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
import ProductTreeViewList from "./ProductTreeViewList";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "@/StateManagment/Slices/InfiniteTreeView";
import { ProductTreeViewModalSelector, setIsOpen } from "@/StateManagment/Slices/ProductTreeView";

export default function ProductTreeViewModal() {
  const dispatch = useDispatch();
  const {isOpenModal} = useSelector(ProductTreeViewModalSelector)
  return (
    <>
      <Tooltip title="نمایش کالاها">
        <IconButton
          onClick={() => {
            dispatch(setIsOpen(true))
            dispatch(reset());
          }}
        >
          <FormatListBulletedIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={isOpenModal}
        onClose={() => dispatch(setIsOpen(false))}
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
              لیست محصولات
            </Typography>
            <IconButton aria-label="close" onClick={() => dispatch(setIsOpen(false))}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid display={"flex"} flexDirection={"column"} container spacing={2}>
            <ProductTreeViewList />
          </Grid>
        </ModalContent>
      </Modal>
    </>
  );
}
