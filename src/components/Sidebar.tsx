"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MobileSizeDrawer from "./MobileSizeDrawer";
import { useState } from "react";
import Link from "next/link";
import InventoryIcon from "@mui/icons-material/Inventory";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import { LogOut } from "@/actions/LogOut";
import { useRouter } from "next/navigation";

const drawerWidth = 200;

export default function Sidebar({ children }: any) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const router = useRouter()
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const Exit = async ()=>{
    LogOut()
    router.push('/Login')
  }

  const drawer = (
    <div>
      <Toolbar />
      {/* <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon /> 
             <ChevronRightIcon />
        </IconButton> */}
      <Divider />
      <List>
        <ListItem disablePadding>
          <Link
            href={"/Order"}
            style={{
              color: "",
              listStyle: "none",
              width: "100%",
              textDecoration: "none",
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <InventoryIcon sx={{ color: "black" }} />
              </ListItemIcon>
              <Typography variant="subtitle1" color={"black"}>
                سفارشات
              </Typography>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link
            href={"/OrderList"}
            style={{
              color: "",
              listStyle: "none",
              width: "100%",
              textDecoration: "none",
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <InventoryIcon sx={{ color: "black" }} />
              </ListItemIcon>
              <Typography variant="subtitle1" color={"black"}>
                لیست سفارشات
              </Typography>
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={Exit}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <Typography variant="subtitle1" color={"black"}>
              خروج
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          right: { sm: `${drawerWidth}px` },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {/* Responsive drawer */}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <MobileSizeDrawer
          drawer={drawer}
          drawerWidth={drawerWidth}
          handleDrawerClose={handleDrawerClose}
          handleDrawerTransitionEnd={handleDrawerTransitionEnd}
          mobileOpen={mobileOpen}
        />
        <Drawer
          anchor="right"
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
