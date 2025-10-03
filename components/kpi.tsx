"use client"

type KpiProps = {
  label: string
  value: string | number
  hint?: string
}

export default function Kpi({ label, value, hint }: KpiProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4" role="figure" aria-label={label}>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
      {hint ? <div className="mt-1 text-xs text-muted-foreground">{hint}</div> : null}
    </div>
  )
}
