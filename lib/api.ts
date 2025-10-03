export function apiBase() {
  return process.env.NEXT_PUBLIC_API_BASE_URL || ""
}

type NewIncidentParams = {
  title: string
  description: string
  type: "Fire" | "Medical" | "Crime" | "Utility"
  severity: "Low" | "Medium" | "High" | "Critical"
  location: { lat: number; lng: number }
  files: File[]
}

export async function postIncident(p: NewIncidentParams) {
  const base = apiBase()
  if (!base) {
    // Offline fallback
    await new Promise((r) => setTimeout(r, 600))
    return { id: crypto.randomUUID() }
  }

  const fd = new FormData()
  fd.append("title", p.title)
  fd.append("description", p.description)
  fd.append("type", p.type)
  fd.append("severity", p.severity)
  fd.append("location", JSON.stringify(p.location))
  for (const file of p.files) fd.append("files", file)

  const res = await fetch(`${base}/api/incidents`, {
    method: "POST",
    body: fd,
  })
  if (!res.ok) throw new Error("Failed to submit incident")
  return res.json()
}

export async function putIncidentStatus(id: string, status: string) {
  const base = apiBase()
  if (!base) {
    // Offline fallback
    await new Promise((r) => setTimeout(r, 400))
    return { ok: true }
  }
  const res = await fetch(`${base}/api/incidents/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  })
  if (!res.ok) throw new Error("Failed to update status")
  return res.json()
}
