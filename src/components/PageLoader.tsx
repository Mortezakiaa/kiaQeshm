"use client";
import { HashLoader } from "react-spinners";

export default function PageLoader() {
  return (
    <>
      <HashLoader
        color={"#36D7B7"}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </>
  );
}
