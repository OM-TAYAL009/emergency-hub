"use client"

export default function IncidentCard({
  incident,
  onAccept,
  onResolve,
  showActions,
}: {
  incident: any
  onAccept?: () => void
  onResolve?: () => void
  showActions?: boolean
}) {
  return (
    <article className="rounded-lg border border-border p-4">
      <header className="flex items-center justify-between">
        <h3 className="text-base font-medium text-pretty">{incident.title}</h3>
        <span className="rounded-full border border-border px-2 py-0.5 text-xs">{incident.status}</span>
      </header>
      <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div>
          <dt className="text-muted-foreground">Type</dt>
          <dd>{incident.type}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Severity</dt>
          <dd>{incident.severity}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Assigned</dt>
          <dd>{incident.assignedDepartment ?? "-"}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Created</dt>
          <dd>{new Date(incident.createdAt).toLocaleString()}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-muted-foreground">Description</dt>
          <dd className="line-clamp-3">{incident.description}</dd>
        </div>
      </dl>
      {showActions && (
        <div className="mt-4 flex items-center gap-2">
          <button onClick={onAccept} className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent">
            Accept
          </button>
          <button
            onClick={onResolve}
            className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:opacity-90"
          >
            Resolve
          </button>
        </div>
      )}
    </article>
  )
}
