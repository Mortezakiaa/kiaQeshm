"use client";

import { Alert, Button, Stack } from "@mui/material";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Stack>
      <Alert severity="error">
        خطای ناخواسته به وجود آمده است. لطفا مجددا تلاش کنید
      </Alert>
      <Button style={{marginTop:'10px' , maxWidth:'200px'}} variant="outlined" size="medium" onClick={() =>{reset()}}>
        تلاش مجدد
      </Button>
    </Stack>
  );
}
