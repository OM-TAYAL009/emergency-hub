"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Placeholder register; real app would POST to /auth/register
    alert("Registered! Please login.")
  }

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <Navbar />
      <section className="mx-auto max-w-md px-4 py-10">
        <h1 className="text-2xl font-semibold">Register</h1>
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
          <button
            type="submit"
            className="w-full rounded-md bg-primary px-3 py-2 text-primary-foreground hover:opacity-90"
          >
            Create account
          </button>
        </form>
        <p className="mt-4 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link className="underline" href="/login">
            Login
          </Link>
        </p>
      </section>
    </main>
  )
}
