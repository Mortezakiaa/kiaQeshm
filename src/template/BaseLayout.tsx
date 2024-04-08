'use client'
import { Grid, Paper, styled } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function BaseLayout() {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={2} md={6} lg={4}>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={10} md={6} lg={8}>
          <Item>xs=4</Item>
        </Grid>
      </Grid>
    </>
  );
}
