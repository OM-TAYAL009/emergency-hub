"use client"

import Navbar from "@/components/navbar"
import MapView from "@/components/map-view"
import { RequireRole } from "@/lib/auth"
import useSWR from "swr"
import { apiBase } from "@/lib/api"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts"

export default function AdminPage() {
  return (
    <RequireRole role="admin">
      <main className="min-h-dvh bg-background text-foreground">
        <Navbar />
        <section className="mx-auto max-w-7xl px-4 py-8">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Admin Super Dashboard</h1>
              <p className="text-sm text-muted-foreground">City-wide incidents with real-time visibility</p>
            </div>
          </header>

          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <KPI label="Total Incidents" value="128" />
            <KPI label="Open" value="34" />
            <KPI label="Avg Response" value="11m" />
            <KPI label="Resolved 24h" value="86" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-lg border border-border p-4 lg:col-span-2">
              <h2 className="text-lg font-medium">Heatmap (approx.)</h2>
              <div className="mt-2 h-[420px]">
                <AdminHeatmap />
              </div>
            </div>
            <div className="rounded-lg border border-border p-4">
              <h2 className="text-lg font-medium">Resolved vs Pending</h2>
              <ResolvedPendingChart />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-lg border border-border p-4 lg:col-span-2">
              <h2 className="text-lg font-medium">Department Workload</h2>
              <DepartmentWorkloadChart />
            </div>
            <div className="rounded-lg border border-border p-4">
              <h2 className="text-lg font-medium">Average Response Time</h2>
              <AvgResponseTimeChart />
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-border p-4">
            <h2 className="text-lg font-medium">Incidents</h2>
            <AdminIncidentsTable />
          </div>
        </section>
      </main>
    </RequireRole>
  )
}

function AdminHeatmap() {
  const { data } = useSWR(`${apiBase()}/api/incidents`)
  const markers = (data?.incidents ?? []).map((i: any) => ({
    id: i.id,
    lat: i.location?.lat ?? 0,
    lng: i.location?.lng ?? 0,
    title: i.title,
    // use severity to size circle markers
    severity: i.severity,
  }))
  return <MapView markers={markers} heatRadiusBySeverity />
}

function ResolvedPendingChart() {
  const { data } = useSWR(`${apiBase()}/api/incidents/metrics/summary`)
  const resolved = data?.resolved ?? 12
  const pending = data?.pending ?? 8
  const chartData = [
    { name: "Resolved", value: resolved },
    { name: "Pending", value: pending },
  ]
  const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)"]

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={80} label>
            {chartData.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

function DepartmentWorkloadChart() {
  const { data } = useSWR(`${apiBase()}/api/incidents/metrics/workload`)
  const chartData = data?.departments ?? [
    { dept: "Fire", count: 10 },
    { dept: "Medical", count: 7 },
    { dept: "Police", count: 9 },
    { dept: "Utility", count: 5 },
  ]
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="dept" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="var(--color-chart-3)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function AvgResponseTimeChart() {
  const { data } = useSWR(`${apiBase()}/api/incidents/metrics/response-time`)
  const chartData = data?.avgPerDept ?? [
    { dept: "Fire", min: 12 },
    { dept: "Medical", min: 9 },
    { dept: "Police", min: 15 },
    { dept: "Utility", min: 20 },
  ]
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="dept" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="min" fill="var(--color-chart-2)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function AdminIncidentsTable() {
  const { data } = useSWR(`${apiBase()}/api/incidents`)
  const incidents = data?.incidents ?? []
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-left text-muted-foreground">
          <tr className="[&>th]:py-2 [&>th]:pr-4">
            <th>Title</th>
            <th>Type</th>
            <th>Severity</th>
            <th>Status</th>
            <th>Assigned</th>
            <th>Response Time</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody className="align-top">
          {incidents.map((i: any) => (
            <tr key={i.id} className="border-t border-border [&>td]:py-2 [&>td]:pr-4">
              <td>{i.title}</td>
              <td>{i.type}</td>
              <td>{i.severity}</td>
              <td>{i.status}</td>
              <td>{i.assignedDepartment ?? "-"}</td>
              <td>{i.responseTime ? `${i.responseTime} min` : "-"}</td>
              <td>{new Date(i.createdAt).toLocaleString()}</td>
            </tr>
          ))}
          {incidents.length === 0 && (
            <tr>
              <td colSpan={7} className="py-6 text-center text-muted-foreground">
                No incidents
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  )
}
