'use client'
import SidebarDrawer from "@/components/SidebarDrawer";
import { Grid } from "@mui/material";


export default function MainLayout() {
  return (
    <>
      <Grid container>
        <SidebarDrawer/>
      </Grid>
    </>
  );
}
