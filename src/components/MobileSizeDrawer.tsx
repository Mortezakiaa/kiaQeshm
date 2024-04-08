import { Drawer } from "@mui/material";

export interface MobileDrawer {
  mobileOpen: boolean;
  handleDrawerTransitionEnd: () => void;
  handleDrawerClose: () => void;
  drawerWidth: number;
  drawer: React.ReactNode;
}

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
