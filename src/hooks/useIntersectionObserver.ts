"use client";
import { useEffect, useRef } from "react";

type T = {
  hasNextPage: boolean;
  fetchNextPage: () => any;
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
  }, [ref, fetchNextPage, hasNextPage]);

  return { ref };
}
