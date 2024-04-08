import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SidebarDrawer from "./SidebarDrawer";


export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="default" position="static">
        <Toolbar>
          <SidebarDrawer />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
