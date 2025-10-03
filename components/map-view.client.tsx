"use client"

import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useMemo } from "react"

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
})

export default function LeafletClient({
  markers,
  heatRadiusBySeverity,
}: {
  markers: Array<{ id: string; lat: number; lng: number; title?: string; severity?: string }>
  heatRadiusBySeverity?: boolean
}) {
  const center = useMemo(() => {
    if (markers.length > 0) return [markers[0].lat, markers[0].lng] as [number, number]
    return [37.7749, -122.4194] as [number, number] // default SF
  }, [markers])

  function radiusFor(sev?: string) {
    switch (sev) {
      case "Critical":
        return 20
      case "High":
        return 14
      case "Medium":
        return 10
      default:
        return 8
    }
  }

  return (
    <MapContainer center={center} zoom={12} style={{ height: "100%", width: "100%" }}>
      <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers.map((m) =>
        heatRadiusBySeverity ? (
          <CircleMarker
            key={m.id}
            center={[m.lat, m.lng]}
            radius={radiusFor(m.severity)}
            pathOptions={{ color: "var(--color-primary)" }}
          >
            <Popup>
              <strong>{m.title ?? "Incident"}</strong>
              <br />
              Severity: {m.severity ?? "-"}
            </Popup>
          </CircleMarker>
        ) : (
          <Marker key={m.id} position={[m.lat, m.lng]} icon={defaultIcon}>
            <Popup>
              <strong>{m.title ?? "Incident"}</strong>
              <br />
              {m.severity ? `Severity: ${m.severity}` : null}
            </Popup>
          </Marker>
        ),
      )}
    </MapContainer>
  )
}
