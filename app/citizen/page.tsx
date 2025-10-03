"use client"

import Navbar from "@/components/navbar"
import IncidentForm from "@/components/incident-form"
import IncidentList from "@/components/incident-list"
import { useAuth, RequireRole } from "@/lib/auth"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function MiniStep({ title }: { title: string }) {
  return <div className="rounded-md border border-border bg-card p-3 text-sm">{title}</div>
}

export default function CitizenPage() {
  const { user } = useAuth()
  return (
    <RequireRole role="citizen">
      <main className="min-h-dvh bg-background text-foreground">
        <Navbar />
        <section className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h1 className="text-2xl font-semibold">Report an Incident</h1>
              <p className="mt-1 text-sm text-muted-foreground">Submit emergencies with details and location.</p>
              <div className="mt-6">
                <IncidentForm />
              </div>
            </div>
            <div className="order-first md:order-none">
              <div className="rounded-md border border-border bg-card p-2">
                <Image
                  src="/citizen-incident-report-preview.jpg"
                  width={520}
                  height={260}
                  alt="Citizen report preview"
                  className="h-auto w-full rounded"
                />
              </div>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <MiniStep title="1. Describe" />
                <MiniStep title="2. Locate" />
                <MiniStep title="3. Submit" />
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-medium">Your Reports</h2>
            <p className="mt-1 text-sm text-muted-foreground">Real-time updates as statuses change.</p>
            {user && <IncidentList scope="citizen" userId={user.id} />}
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-medium">Safety Notices</h2>
            <p className="mt-1 text-sm text-muted-foreground">Community updates and advisories.</p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Road Closure</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  3rd Ave closed between Pine and Cedar for utility repairs. Expect delays.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Heat Advisory</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Stay hydrated and check on vulnerable neighbors during peak afternoon hours.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </RequireRole>
  )
}
