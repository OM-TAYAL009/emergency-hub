"use client"

import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  return (
    <header className="border-b border-border bg-card">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/placeholder-logo.svg" alt="Emergency Hub logo" width={24} height={24} className="rounded-sm" />
          <span className="font-medium">Emergency Hub</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            className={cn(
              "rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              pathname === "/citizen" && "bg-accent/60 text-accent-foreground",
            )}
            href="/citizen"
          >
            Citizen
          </Link>
          <Link
            className={cn(
              "rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              pathname === "/responder" && "bg-accent/60 text-accent-foreground",
            )}
            href="/responder"
          >
            Responder
          </Link>
          <Link
            className={cn(
              "rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              pathname === "/admin" && "bg-accent/60 text-accent-foreground",
            )}
            href="/admin"
          >
            Admin
          </Link>
          {!user ? (
            <div className="ml-2 flex items-center gap-2">
              <Link href="/login">
                <Button size="sm" className="px-3">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" variant="outline" className="px-3 bg-transparent">
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <Button onClick={logout} size="sm" variant="outline" className="ml-2 px-3 bg-transparent">
              Logout
            </Button>
          )}
        </div>
      </nav>
    </header>
  )
}
