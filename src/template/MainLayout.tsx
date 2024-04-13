"use client";
import Sidebar from "@/components/Sidebar";
import { Grid } from "@mui/material";

export interface childProps {
  children: React.ReactNode;
}
export default function MainLayout({ children }: childProps) {
  return (
    <>
      <Grid container>
        <Sidebar>{children}</Sidebar>
      </Grid>
    </>
  );
}
