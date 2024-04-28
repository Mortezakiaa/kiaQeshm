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
import { useEffect, useState } from "react";
import Link from "next/link";
import InventoryIcon from "@mui/icons-material/Inventory";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { LogOut } from "@/actions/LogOut";

export default function Sidebar({ children }: any) {
  const router = useRouter();
  const [user , setUser] = useState<string>('')
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState<number>(200);
  const [close, setClose] = useState(false);


  useEffect(()=>{
    const user = localStorage.getItem('user')!
    const us = JSON.parse(user)
    setUser(us)
  },[])

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

  const Exit = async () => {
    LogOut();
    localStorage.clear()
    router.push("/Login");
  };

  const Co = () => {
    if (drawerWidth === 200) {
      setDrawerWidth(50);
      setClose(true);
    } else {
      setDrawerWidth(200);
      setClose(false);
    }
  };

  const drawer = (
    <div>
      <Toolbar style={{ padding: 0 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <IconButton onClick={Co}>
            {close ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>
      </Toolbar>
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
        <Toolbar
          style={{
            display: "flex",
            flexDirection:'row-reverse',
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Typography variant="body1">کاربر : </Typography>
            <Typography variant="subtitle1" color="black">
              {user}
            </Typography>
          </Box>
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
