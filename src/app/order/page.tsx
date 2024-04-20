import { Grid } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Metadata } from "next";
import Order from "@/forms/Order";

export const metadata: Metadata = {
  title: "ثبت سفارشات",
};

export default function page() {
  return (
    <div dir="rtl">
      <Grid item xs={12} sm={6} md={4}>
        <Tooltip title="ثبت سفارش">
          <IconButton
            color="info"
            sx={{
              "&:hover": {
                backgroundColor: "#4dabf5",
                transition: "0.5s",
                color: "white",
              },
            }}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Order />
    </div>
  );
}
