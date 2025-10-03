"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { Role } from "./types"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

type User = { id: string; email: string; role: Role; token: string }
type LoginParams = { email: string; password: string; role: Role }

interface AuthCtx {
  user: User | null
  login: (p: LoginParams) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const raw = localStorage.getItem("auth:user")
    if (raw) setUser(JSON.parse(raw))
  }, [])

  const value = useMemo<AuthCtx>(
    () => ({
      user,
      login: async ({ email, password, role }) => {
        // Placeholder: simulate API auth and a JWT
        if (!email || !password) return false
        const u: User = { id: email, email, role, token: "demo-jwt" }
        localStorage.setItem("auth:user", JSON.stringify(u))
        setUser(u)
        return true
      },
      logout: () => {
        localStorage.removeItem("auth:user")
        setUser(null)
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}

export function RequireRole({ role, children }: { role: Role; children: React.ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!user) {
      toast({ title: "Please login" })
      router.replace("/login")
      return
    }
    if (user.role !== role) {
      toast({ title: "Insufficient permissions" })
      router.replace("/")
    }
  }, [user, role, router, toast])

  if (!user || user.role !== role) return null
  return <>{children}</>
}
