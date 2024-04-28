"use client";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Grid, IconButton, Modal, Tooltip, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TreeViewKalaList from "./ProductTreeViewList";
import { ModalContent, StyledBackdrop, style } from "./ModalPropertys";

export default function CustomerTreeViewModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Tooltip title="نمایش لیست مشتریان">
        <IconButton onClick={handleOpen}>
          <FormatListBulletedIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
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
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid
            display={"flex"}
            flexDirection={"column"}
            container
            spacing={2}
          >
            
          </Grid>
          <Box>
            <Button variant="contained">تایید</Button>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}
