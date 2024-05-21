"use client";
import { TreeApiProps } from "@/Types/Types";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

type T = {
  observerDependency: string[];
  setState: Dispatch<SetStateAction<TreeApiProps>>;
  state: TreeApiProps;
};

export default function useIntersectionObserver({
  observerDependency,
  setState,
  state,
}: T) {
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setState({ ...state, CurrentPage: ++state.CurrentPage });
        }
      },
      {
        threshold: 1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, observerDependency]);

  return { ref };
}
