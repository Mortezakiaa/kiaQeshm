"use client";
import {
  InfiniteTreeSelector,
  increaseCurrentPage,
} from "@/StateManagment/Slices/InfiniteTreeView";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useIntersectionObserver() {
  const ref = useRef();
  const dispatch = useDispatch();
  const { TreeViewList } = useSelector(InfiniteTreeSelector);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(increaseCurrentPage());
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
  }, [ref, TreeViewList]);

  return { ref };
}
