"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HomePage() {
  const { user } = useAuth()
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h1 className="text-balance text-3xl font-semibold">Centralized Emergency Response Hub</h1>
              <p className="mt-2 text-pretty text-muted-foreground">
                Report incidents, coordinate departmental response, and monitor city-wide emergencies in real-time.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href="/citizen">
                  <Button className="px-4">Report an Incident</Button>
                </Link>
                <Link href="/responder">
                  <Button variant="outline" className="px-4 bg-transparent">
                    Responder Dashboard
                  </Button>
                </Link>
                <Link href="/admin">
                  <Button variant="ghost" className="px-4">
                    Admin Overview
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-md border border-border bg-background/50 p-2">
                <Image
                  src="/emergency-response-dashboard-preview.jpg"
                  width={640}
                  height={320}
                  alt="Emergency dashboard preview"
                  className="h-auto w-full rounded"
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Live metrics and maps unify response workflows.</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Incidents Today" value="42" />
          <StatCard label="In Progress" value="16" />
          <StatCard label="Avg Response" value="12m" />
          <StatCard label="Resolved" value="31" />
        </div>

        {/* Features */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <FeatureCard
            title="Citizen Reporting"
            desc="Simple, guided forms with location and media uploads."
            img="/citizen-report-illustration.jpg"
          />
          <FeatureCard
            title="Responder Routing"
            desc="See assignments and navigate with live updates."
            img="/responder-map-illustration.jpg"
          />
          <FeatureCard
            title="Admin Analytics"
            desc="Trends, hotspots, and performance metrics at a glance."
            img="/admin-analytics-illustration.jpg"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <RoleCard title="Citizen" desc="Submit and track your reports" href="/citizen" />
          <RoleCard title="Responder" desc="Work assigned incidents in real-time" href="/responder" />
          <RoleCard title="Admin" desc="City-wide visibility, heatmaps, and metrics" href="/admin" />
        </div>

        {!user && (
          <div className="mt-8 flex items-center gap-3">
            <Link href="/login" className="underline text-primary">
              Login
            </Link>
            <Link href="/register" className="underline text-primary">
              Register
            </Link>
          </div>
        )}
      </section>
    </main>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  )
}

function FeatureCard({
  title,
  desc,
  img,
}: {
  title: string
  desc: string
  img: string
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="rounded-md border border-border bg-background p-2">
        <Image src={img || "/placeholder.svg"} width={280} height={140} alt={title} className="h-auto w-full rounded" />
      </div>
      <h3 className="mt-3 text-lg font-medium">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  )
}

function RoleCard({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-border p-5 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </Link>
  )
}
