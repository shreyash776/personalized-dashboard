'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../features/store'
import { setCategories, setMovieGenres, setMusicGenres } from '../../features/user/userSlice'
import { useEffect, useState } from 'react'
import axios from 'axios'

// Predefined news categories
const categoriesAvailable = ['technology', 'business', 'sports', 'science', 'health', 'entertainment']

// Hardcoded music genres list
const musicGenresAvailable = [
  'pop',
  'rock',
  'hip-hop',
  'jazz',
  'electronic',
  'classical',
  'country',
  'r&b',
  'metal',
  'reggae'
]

export default function SettingsPage() {
  // News preferences from Redux
  const selected = useSelector((state: RootState) => state.user.categories)
  const dispatch = useDispatch()

  // Movie genre preferences from Redux
  const selectedGenres = useSelector((state: RootState) => state.user.movieGenres)
  const [genreList, setGenreList] = useState<{ id: number; name: string }[]>([])

  // Music genre preferences from Redux
  const selectedMusicGenres = useSelector((state: RootState) => state.user.musicGenres)

  // Fetch movie genres from TMDB API on mount
  useEffect(() => {
    async function fetchGenres() {
      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
        )
        setGenreList(response.data.genres)
      } catch {
        setGenreList([])
      }
    }
    fetchGenres()
  }, [])

  // Persist News categories to localStorage
  useEffect(() => {
    localStorage.setItem("dashboard_categories", JSON.stringify(selected))
  }, [selected])

  // Persist Movie genres to localStorage
  useEffect(() => {
    localStorage.setItem("dashboard_movieGenres", JSON.stringify(selectedGenres))
  }, [selectedGenres])

  // Persist Music genres to localStorage
  useEffect(() => {
    localStorage.setItem("dashboard_musicGenres", JSON.stringify(selectedMusicGenres))
  }, [selectedMusicGenres])

  // Toggle handlers for News categories
  const toggleCategory = (cat: string) => {
    if (selected.includes(cat)) {
      dispatch(setCategories(selected.filter(c => c !== cat)))
    } else {
      dispatch(setCategories([...selected, cat]))
    }
  }

  // Toggle handlers for Movie genres
  const toggleGenre = (id: number) => {
    if (selectedGenres.includes(id)) {
      dispatch(setMovieGenres(selectedGenres.filter(g => g !== id)))
    } else {
      dispatch(setMovieGenres([...selectedGenres, id]))
    }
  }

  // Toggle handlers for Music genres
  const toggleMusicGenre = (genre: string) => {
    if (selectedMusicGenres.includes(genre)) {
      dispatch(setMusicGenres(selectedMusicGenres.filter(g => g !== genre)))
    } else {
      dispatch(setMusicGenres([...selectedMusicGenres, genre]))
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Content Preferences</h2>
      <div className="grid gap-2 mb-6">
        {categoriesAvailable.map(cat => (
          <label key={cat} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.includes(cat)}
              onChange={() => toggleCategory(cat)}
              className="accent-blue-600"
            />
            {cat[0].toUpperCase() + cat.slice(1)}
          </label>
        ))}
      </div>
      <div className="mt-4 text-gray-500 text-sm mb-8">
        Your dashboard will show news from your selected categories.
      </div>

      <h2 className="text-2xl font-bold mb-4">Movie Genre Preferences</h2>
      <div className="grid gap-2 mb-8">
        {genreList.length === 0 && <p className="text-gray-400">Loading genres...</p>}
        {genreList.map(genre => (
          <label key={genre.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre.id)}
              onChange={() => toggleGenre(genre.id)}
              className="accent-blue-600"
            />
            {genre.name}
          </label>
        ))}
      </div>
      <div className="mt-4 text-gray-500 text-sm mb-8">
        Your dashboard will show movies from your selected genres.
      </div>

      <h2 className="text-2xl font-bold mb-4">Music Preferences</h2>
      <div className="grid gap-2 mb-6">
        {musicGenresAvailable.map(genre => (
          <label key={genre} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedMusicGenres.includes(genre)}
              onChange={() => toggleMusicGenre(genre)}
              className="accent-blue-600"
            />
            {genre[0].toUpperCase() + genre.slice(1)}
          </label>
        ))}
      </div>
      <div className="mt-4 text-gray-500 text-sm">
        Your dashboard will show music from your selected genres.
      </div>
    </div>
  )
}