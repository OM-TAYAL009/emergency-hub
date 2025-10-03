"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { io, type Socket } from "socket.io-client"
import { useToast } from "@/hooks/use-toast"

function wsUrl() {
  return process.env.NEXT_PUBLIC_WS_URL || ""
}

let socketSingleton: Socket | null = null
function getSocket(): Socket | null {
  const url = wsUrl()
  if (!url) return null
  if (!socketSingleton) {
    socketSingleton = io(url, { transports: ["websocket"] })
  }
  return socketSingleton
}

const SocketContext = createContext<Socket | null>(null)

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const s = getSocket()
    if (!s) return
    setSocket(s)
    s.on("connect", () => console.log("[v0] socket connected"))
    s.on("incident:new", (payload) => toast({ title: "New incident", description: payload?.title }))
    s.on("incident:update", (payload) => toast({ title: "Incident updated", description: payload?.title }))
    s.on("incident:resolved", (payload) => toast({ title: "Incident resolved", description: payload?.title }))
    return () => {
      s.off("incident:new")
      s.off("incident:update")
      s.off("incident:resolved")
    }
  }, [toast])

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}

export function useSocket() {
  return useContext(SocketContext)
}
