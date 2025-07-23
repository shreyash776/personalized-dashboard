"use client"

import { useEffect, useState, useMemo } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../features/store"
import MusicCard from "../../components/cards/MusicCard"
import { Search } from "lucide-react"
import { ClipLoader } from "react-spinners"

export default function MusicPage() {
  const musicGenres = useSelector((state: RootState) => state.user.musicGenres)
  const [tracks, setTracks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    async function fetchTracks() {
      setLoading(true)
      setError("")

      try {
        const genreQuery = musicGenres.length > 0 ? musicGenres.join(",") : ""
        const url = genreQuery
          ? `/api/deezer/tracks?genreName=${encodeURIComponent(genreQuery)}`
          : "/api/deezer/tracks"

        const res = await fetch(url)
        if (!res.ok) throw new Error("Failed to fetch tracks")

        const data = await res.json()
        setTracks(data)
      } catch (e) {
        setError("Failed to load tracks.")
      } finally {
        setLoading(false)
      }
    }

    fetchTracks()
  }, [musicGenres])

  const filteredTracks = useMemo(() => {
    if (!search) return tracks
    return tracks.filter((track) =>
      track.title.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, tracks])

  if (loading)
  return (
    <div className="pt-24 flex justify-center items-center min-h-screen bg-gray-900 pb-2">
      <ClipLoader color="#3b82f6" size={48} />
    </div>
  );

  if (error)
    return <div className="pt-24 text-center text-red-600">{error}</div>

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8  w-screen bg-gray-900 min-h-screen">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-400">
          {musicGenres.length > 0
            ? "Your Personalized Music Feed"
            : "Trending Tracks"}
        </h1>

        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 inset-y-0 my-auto text-gray-400 dark:text-gray-300 h-5 w-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tracks..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-md"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTracks.length === 0 ? (
          <div className="text-gray-400 col-span-full text-center">No tracks found.</div>
        ) : (
          filteredTracks.map((track) => (
            <MusicCard key={track.id} track={track} />
          ))
        )}
      </div>
    </div>
  )
}
