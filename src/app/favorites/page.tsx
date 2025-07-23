"use client"

import { useState, useMemo } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../features/store"
import NewsCard from "../../components/cards/NewsCard"
import MovieCard from "../../components/cards/MovieCard"
import MusicCard from "../../components/cards/MusicCard"
import { Search } from "lucide-react"

export default function FavoritesPage() {
  const favorites = useSelector((state: RootState) => state.favorites)
  const [search, setSearch] = useState("")

  const filteredFavorites = useMemo(() => {
    if (!search) return favorites
    return favorites.filter(f =>
      f.payload?.title?.toLowerCase().includes(search.toLowerCase()) ||
      f.payload?.name?.toLowerCase().includes(search.toLowerCase()) ||
      f.payload?.description?.toLowerCase().includes(search.toLowerCase())
    )
  }, [favorites, search])

  const news = filteredFavorites.filter(f => f.type === 'news')
  const movies = filteredFavorites.filter(f => f.type === 'movie')
  const musicTracks = filteredFavorites.filter(f => f.type === 'music-track')
  const musicAlbums = filteredFavorites.filter(f => f.type === 'music-album')

  if (favorites.length === 0) {
    return (
      <div className="pt-24 text-gray-400 text-center text-lg min-h-screen bg-gray-900">
        No favorites yet.
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 mx-auto bg-gray-900 text-white pb-2">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Your Favorites
        </h1>

        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 inset-y-0 my-auto text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search favorites..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
          />
        </div>
      </div>

      {news.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">News</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {news.map(f => (
              <NewsCard key={f.id} article={f.payload} />
            ))}
          </div>
        </>
      )}

      {movies.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-purple-400">Movies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {movies.map(f => (
              <MovieCard key={f.id} movie={f.payload} />
            ))}
          </div>
        </>
      )}

      {musicTracks.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-green-400">Music Tracks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {musicTracks.map(f => (
              <MusicCard key={f.id} track={f.payload} />
            ))}
          </div>
        </>
      )}

      {musicAlbums.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Music Albums</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {musicAlbums.map(f => (
              <MusicCard key={f.id} album={f.payload} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
