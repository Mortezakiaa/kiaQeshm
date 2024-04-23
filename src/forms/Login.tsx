"use client";
import RTLTextField from "@/components/RTLTextField";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import logo from "../../public/images/KQ_Logo_2clr_Horz_final-1.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { UserLogin } from "@/Types/Types";
import Spinner from "@/components/Spinner";
import axios from "axios";

export default function Login() {
  const [signIn, setSignIn] = useState<UserLogin>({
    userName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const Auth = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Auth/Login`,
        signIn
      );
      const data = res.data;
      console.log('data' , data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error' , error);
    }
  };

  return (
      <Stack
        style={{
          maxWidth: "100%",
          width: "550px",
          minWidth: "500px",
          border: "1px solid #DAE2ED",
          padding: "16px",
          borderRadius: "10px",
          margin: "auto",
          marginTop: "10%",
        }}
      >
        <Grid
          container
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Grid
            item
            style={{
              backgroundColor: "#bdbdbd",
              padding: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image src={logo} alt="logo" width={400} />
          </Grid>
          <Grid item style={{ textAlign: "center" }}>
            <Typography variant="h4">سیستم ثبت سفارش کیا قشم</Typography>
          </Grid>
          <Grid item>
            <RTLTextField
              onChange={(e) => {
                setSignIn({ ...signIn, userName: e.target.value });
              }}
              fullWidth
              type="text"
              label="نام کاربری"
            />
          </Grid>
          <Grid item>
            <RTLTextField
              onChange={(e) => {
                setSignIn({ ...signIn, password: e.target.value });
              }}
              fullWidth
              type={showPassword ? "text" : "password"}
              label="رمز عبور"
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowPassword((prev) => !prev);
                      }}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid
            item
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            {loading ? (
              <Spinner />
            ) : (
              <Button onClick={()=> {Auth()}} variant="outlined" fullWidth>
                ورود
              </Button>
            )}
          </Grid>
        </Grid>
      </Stack>
  );
}
