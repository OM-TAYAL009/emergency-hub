"use client"

import Navbar from "@/components/navbar"
import IncidentList from "@/components/incident-list"
import MapView from "@/components/map-view"
import { RequireRole } from "@/lib/auth"
import useSWR from "swr"
import { apiBase } from "@/lib/api"
import Kpi from "@/components/kpi"

export default function ResponderPage() {
  return (
    <RequireRole role="responder">
      <main className="min-h-dvh bg-background text-foreground">
        <Navbar />
        <section className="mx-auto max-w-6xl px-4 py-8">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Responder Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage assigned incidents in real-time</p>
            </div>
          </header>

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <Kpi label="New" value="7" />
            <Kpi label="Assigned" value="12" />
            <Kpi label="In Transit" value="4" />
            <Kpi label="Resolved Today" value="9" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border p-4">
              <h2 className="text-lg font-medium">Assigned Incidents</h2>
              <IncidentList scope="responder" />
            </div>
            <div className="rounded-lg border border-border p-2">
              <h2 className="px-2 pt-2 text-lg font-medium">Map</h2>
              <div className="h-[420px]">
                <ResponderMap />
              </div>
            </div>
          </div>
        </section>
      </main>
    </RequireRole>
  )
}

function ResponderMap() {
  const { data } = useSWR(`${apiBase()}/api/incidents?assigned=me`)
  const positions = (data?.incidents ?? []).map((i: any) => ({
    id: i.id,
    lat: i.location?.lat ?? 0,
    lng: i.location?.lng ?? 0,
    title: i.title,
    severity: i.severity,
  }))
  return <MapView markers={positions} />
}
