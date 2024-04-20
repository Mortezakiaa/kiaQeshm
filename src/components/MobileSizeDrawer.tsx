import { MobileDrawer } from "@/Types/Types";
import { Drawer } from "@mui/material";

export default function MobileSizeDrawer(props: MobileDrawer) {
  return (
    <>
      <Drawer
        anchor="right"
        variant="temporary"
        open={props.mobileOpen}
        onTransitionEnd={props.handleDrawerTransitionEnd}
        onClose={props.handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawerWidth,
          },
        }}
      >
        {props.drawer}
      </Drawer>
    </>
  );
}
