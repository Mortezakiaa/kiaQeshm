import Sidebar from "@/components/Sidebar";
import { Grid } from "@mui/material";

export interface childProps {
  children: React.ReactNode;
}
export default function MainLayout({ children }: childProps) {
  return (
    <>
      <Grid
        container
        sx={{ width: "100%", "& div.MuiBox-root": { width: "100%" } }}
      >
        <Sidebar>{children}</Sidebar>
      </Grid>
    </>
  );
}
