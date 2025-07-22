"use client"

import { useState, useMemo } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../features/store"
import { useGetPopularMoviesQuery } from "../../services/tmdbApi"
import MovieCard from "../../components/cards/MovieCard"

export default function MoviesPage() {
  const genreIds = useSelector((state: RootState) => state.user.movieGenres)
  const [search, setSearch] = useState("")

  const genreString = genreIds.length > 0 ? genreIds.join(",") : ""

 
  const { data: movieData, isLoading, error } = useGetPopularMoviesQuery(genreString)

  
  const filteredMovies = useMemo(() => {
    if (!movieData?.results) return []

    if (!search) return movieData.results

    return movieData.results.filter((movie: { id: number; title: string; [key: string]: any }) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    )
  }, [movieData, search])

  if (isLoading) return <div>Loading movies…</div>
  if (error) return <div className="text-red-600">Failed to load movies</div>

  return (
    <div>
      <div className="w-full flex justify-end my-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search movies..."
          className="py-2 px-4 rounded border outline-blue-600 dark:bg-gray-700 dark:text-white min-w-[220px]"
        />
      </div>

      <h1 className="text-3xl font-bold mb-6">Movies</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMovies.length === 0 ? (
          <div className="text-gray-400 col-span-full">No movies found.</div>
        ) : (
          filteredMovies.map((movie: { id: number; title: string; [key: string]: any }) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </div>
    </div>
  )
}
