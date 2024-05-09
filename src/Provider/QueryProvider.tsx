'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type T = {
  children:React.ReactNode
}

export default function QueryProvider({children}:T) {
  const q = new QueryClient()
  return (
    <>
        <QueryClientProvider client={q}>{children}</QueryClientProvider>
    </>
  )
}
