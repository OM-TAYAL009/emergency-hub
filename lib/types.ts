export type Role = "citizen" | "responder" | "admin"

export interface Incident {
  id: string
  title: string
  description: string
  type: "Fire" | "Medical" | "Crime" | "Utility"
  severity: "Low" | "Medium" | "High" | "Critical"
  status: "New" | "Accepted" | "Resolved" | string
  assignedDepartment?: string
  location?: { lat: number; lng: number }
  reporter?: { id?: string; name?: string; email?: string }
  createdAt: string
  responseTime?: number
  images?: string[]
}
