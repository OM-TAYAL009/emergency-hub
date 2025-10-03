"use client"

import type React from "react"
import { SWRConfig } from "swr"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/auth"
import { SocketProvider } from "@/lib/socket"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: true,
        shouldRetryOnError: true,
        fetcher: (url: string) =>
          fetch(url).then((r) => {
            if (!r.ok) throw new Error("Network error")
            return r.json()
          }),
      }}
    >
      <AuthProvider>
        <SocketProvider>
          {children}
          <Toaster />
        </SocketProvider>
      </AuthProvider>
    </SWRConfig>
  )
}
