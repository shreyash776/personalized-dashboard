"use client"

import { useEffect, useState } from "react"
import MusicCard from "../../components/cards/MusicCard"

export default function MusicPage() {
  const [albums, setAlbums] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const res = await fetch("/api/spotify/new-releases")
        if (!res.ok) throw new Error("Failed to fetch")
        const data = await res.json()
        setAlbums(data)
      } catch {
        setError("Failed to fetch Spotify new releases")
      } finally {
        setLoading(false)
      }
    }

    fetchAlbums()
  }, [])

  if (loading) return <div>Loading new releases…</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Spotify New Releases</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((album) => (
          <MusicCard key={album.id} album={album} />
        ))}
      </div>
    </div>
  )
}
