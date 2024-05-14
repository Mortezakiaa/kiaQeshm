"use client";

import {
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { useEffect, useRef } from "react";

type T = {
  hasNextPage: boolean;
  fetchNextPage: () => Promise<
    InfiniteQueryObserverResult<InfiniteData<any, unknown>, Error>
  >;
};

export default function useIntersectionObserver({
  hasNextPage,
  fetchNextPage,
}: T) {
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (hasNextPage && entries[0].isIntersecting) {
          fetchNextPage();
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
  }, [ref, hasNextPage, fetchNextPage]);

  return { ref };
}
