"use client"

import useSWR, { mutate } from "swr"
import IncidentCard from "./incident-card"
import { apiBase, putIncidentStatus } from "@/lib/api"
import { useEffect } from "react"
import { useSocket } from "@/lib/socket"

export default function IncidentList({
  scope,
  userId,
}: {
  scope: "citizen" | "responder" | "admin" | "all" | undefined
  userId?: string
}) {
  const key =
    scope === "citizen" && userId
      ? `${apiBase()}/api/incidents?userId=${encodeURIComponent(userId)}`
      : scope === "responder"
        ? `${apiBase()}/api/incidents?assigned=me`
        : `${apiBase()}/api/incidents`

  const { data } = useSWR(key)
  const socket = useSocket()

  useEffect(() => {
    if (!socket) return
    const onAnyUpdate = () => mutate(key)
    socket.on("incident:new", onAnyUpdate)
    socket.on("incident:update", onAnyUpdate)
    socket.on("incident:resolved", onAnyUpdate)
    return () => {
      socket.off("incident:new", onAnyUpdate)
      socket.off("incident:update", onAnyUpdate)
      socket.off("incident:resolved", onAnyUpdate)
    }
  }, [socket, key])

  const incidents = data?.incidents ?? []

  return (
    <div className="grid grid-cols-1 gap-3">
      {incidents.map((i: any) => (
        <IncidentCard
          key={i.id}
          incident={i}
          onAccept={() => putIncidentStatus(i.id, "Accepted").then(() => mutate(key))}
          onResolve={() => putIncidentStatus(i.id, "Resolved").then(() => mutate(key))}
          showActions={scope === "responder"}
        />
      ))}
      {incidents.length === 0 && <p className="text-sm text-muted-foreground">No incidents.</p>}
    </div>
  )
}
