'use client'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../features/store'
import { setCategories, setMovieGenres } from '../../features/user/userSlice'
import { useEffect, useState } from 'react'
import axios from 'axios'

const categoriesAvailable = ['technology', 'business', 'sports', 'science', 'health', 'entertainment']

export default function SettingsPage() {
  // News preferences
  const selected = useSelector((state: RootState) => state.user.categories)
  const dispatch = useDispatch()

  // Movie genre preferences
  const selectedGenres = useSelector((state: RootState) => state.user.movieGenres)
  const [genreList, setGenreList] = useState<{ id: number, name: string }[]>([])

  // Fetch genres from TMDB API on mount
  useEffect(() => {
    async function fetchGenres() {
      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
        )
        setGenreList(response.data.genres)
      } catch (e) {
        setGenreList([])
      }
    }
    fetchGenres()
  }, [])

  // Toggle handlers
  const toggleCategory = (cat: string) => {
    if (selected.includes(cat)) {
      dispatch(setCategories(selected.filter(c => c !== cat)))
    } else {
      dispatch(setCategories([...selected, cat]))
    }
  }

  const toggleGenre = (id: number) => {
    if (selectedGenres.includes(id)) {
      dispatch(setMovieGenres(selectedGenres.filter(g => g !== id)))
    } else {
      dispatch(setMovieGenres([...selectedGenres, id]))
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
      <div className="grid gap-2">
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
      <div className="mt-4 text-gray-500 text-sm">
        Your dashboard will show movies from your selected genres.
      </div>
    </div>
  )
}
