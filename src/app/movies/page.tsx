"use client"

import { useState, useMemo } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../features/store"
import { useGetPopularMoviesQuery } from "../../services/tmdbApi"
import MovieCard from "../../components/cards/MovieCard"
import { Search } from "lucide-react"
import { ClipLoader } from "react-spinners"

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

  if (isLoading)
  return (
    <div className="pt-24 flex justify-center items-center min-h-screen bg-gray-900">
      <ClipLoader color="#3b82f6" size={48} />
    </div>
  );
  if (error) return <div className="pt-24 text-red-600 text-center">Failed to load movies</div>

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8  mx-auto bg-gray-900 pb-2">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-pink-500">
          Popular Movies
        </h1>

        <div className="relative w-full sm:w-80">
  <Search className="absolute left-3 inset-y-0 my-auto text-gray-400 dark:text-gray-300 h-5 w-5" />
  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search movies..."
    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
  />
</div>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMovies.length === 0 ? (
          <div className="text-gray-400 col-span-full text-center">No movies found.</div>
        ) : (
          filteredMovies.map((movie: { id: number; title: string; [key: string]: any }) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </div>
    </div>
  )
}
