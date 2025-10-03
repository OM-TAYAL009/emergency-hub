"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import Navbar from "@/components/navbar"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"citizen" | "responder" | "admin">("citizen")
  const { login } = useAuth()
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const ok = await login({ email, password, role })
    if (ok) {
      router.push(role === "citizen" ? "/citizen" : role === "responder" ? "/responder" : "/admin")
    }
  }

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <Navbar />
      <section className="mx-auto max-w-md px-4 py-10">
        <h1 className="text-2xl font-semibold">Login</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              id="email"
              className="rounded-md border border-input bg-background px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="rounded-md border border-input bg-background px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm">Role</label>
            <select
              className="rounded-md border border-input bg-background px-3 py-2"
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
            >
              <option value="citizen">Citizen</option>
              <option value="responder">Responder</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-primary px-3 py-2 text-primary-foreground hover:opacity-90"
          >
            Sign in
          </button>
        </form>
      </section>
    </main>
  )
}
