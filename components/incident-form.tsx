"use client"

import type React from "react"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { postIncident } from "@/lib/api"

const TYPES = ["Fire", "Medical", "Crime", "Utility"] as const
const SEVERITIES = ["Low", "Medium", "High", "Critical"] as const

export default function IncidentForm() {
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState<(typeof TYPES)[number]>("Fire")
  const [severity, setSeverity] = useState<(typeof SEVERITIES)[number]>("Low")
  const [files, setFiles] = useState<FileList | null>(null)
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [saving, setSaving] = useState(false)

  function detectLocation() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        toast({ title: "Location detected" })
      },
      () => toast({ title: "Could not detect location" }),
    )
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await postIncident({
        title,
        description,
        type,
        severity,
        location: coords ?? { lat: 0, lng: 0 },
        files: files ? Array.from(files) : [],
      })
      setTitle("")
      setDescription("")
      setFiles(null)
      toast({ title: "Incident submitted" })
    } catch (err: any) {
      toast({ title: "Submit failed", description: err.message })
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-lg border border-border p-4">
      <div className="grid gap-1.5">
        <label htmlFor="title" className="text-sm">
          Title
        </label>
        <input
          id="title"
          className="rounded-md border border-input bg-background px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="description" className="text-sm">
          Description
        </label>
        <textarea
          id="description"
          className="min-h-[90px] rounded-md border border-input bg-background px-3 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="grid gap-1.5">
          <label className="text-sm">Type</label>
          <select
            className="rounded-md border border-input bg-background px-3 py-2"
            value={type}
            onChange={(e) => setType(e.target.value as any)}
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-1.5">
          <label className="text-sm">Severity</label>
          <select
            className="rounded-md border border-input bg-background px-3 py-2"
            value={severity}
            onChange={(e) => setSeverity(e.target.value as any)}
          >
            {SEVERITIES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-1.5">
          <label className="text-sm">Location</label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-md border border-border px-3 py-2 text-sm hover:bg-accent"
              onClick={detectLocation}
            >
              Detect GPS
            </button>
            <span className="text-xs text-muted-foreground">
              {coords ? `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : "Not set"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="files" className="text-sm">
          Upload Images
        </label>
        <input id="files" type="file" accept="image/*" multiple onChange={(e) => setFiles(e.target.files)} />
        {files && files.length > 0 && (
          <div className="mt-2 grid grid-cols-3 gap-2">
            {Array.from(files).map((f, idx) => (
              <div key={idx} className="rounded-md border border-border p-2 text-xs">
                {f.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end">
        <button
          disabled={saving}
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Submitting..." : "Submit Incident"}
        </button>
      </div>
    </form>
  )
}
