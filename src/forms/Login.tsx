"use client";
import RTLTextField from "@/components/RTLTextField";
import {
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
import { Auth } from "@/actions/Auth";
import { toast } from "react-toastify";

export default function Login() {
  const [signIn, setSignIn] = useState<UserLogin>({
    userName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const SingIN = async () => {
    setLoading(true);
    const res = await Auth(signIn);
    setLoading(false);
    if (!res) {
      toast.error("مشکلی پیش آمده است مجدد امتحان کنید");
    }
  };

  return (
    <form action={SingIN}>
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
              <button className="button-8">ورود</button>
              // <Button variant="outlined" fullWidth>
              //   ورود
              // </Button>
            )}
          </Grid>
        </Grid>
      </Stack>
    </form>
  );
}
