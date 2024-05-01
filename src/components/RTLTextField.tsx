"use client";
import { styled, TextField } from "@mui/material";

const RTLTextField = styled(TextField)({
  "& label": {
    left: "unset",
    right: "1.75rem",
    transformOrigin: "right",
    fontSize: "0.8rem",
  },
  "& legend": {
    textAlign: "right",
    fontSize: "0.6rem",
  },
});

export default RTLTextField;
