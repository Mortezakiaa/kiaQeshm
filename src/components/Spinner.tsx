"use client";
import { FadeLoader } from "react-spinners";

export default function Spinner() {
  return (
    <>
      <FadeLoader
        color={"#36D7B7"}
        cssOverride={{ width: "20px", height: "20px", top: 0, left: 0 , scale:0.7 }}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </>
  );
}
