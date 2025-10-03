"use client"

import dynamic from "next/dynamic"
import { useEffect } from "react"

const LeafletMap = dynamic(async () => (await import("./map-view.client")).default, {
  ssr: false,
})

export default function MapView({
  markers,
  heatRadiusBySeverity = false,
}: {
  markers: Array<{ id: string; lat: number; lng: number; title?: string; severity?: string }>
  heatRadiusBySeverity?: boolean
}) {
  useEffect(() => {
    // no-op placeholder to ensure client render
  }, [])
  return <LeafletMap markers={markers} heatRadiusBySeverity={heatRadiusBySeverity} />
}
