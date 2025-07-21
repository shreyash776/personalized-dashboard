'use client'
import { useState, useMemo } from "react"
import { useGetTopHeadlinesQuery } from '../services/newsApi'
import { useGetPopularMoviesQuery } from '../services/tmdbApi'
import { useSelector } from 'react-redux'
import { RootState } from '../features/store'
import NewsCard from '../components/cards/NewsCard'
import MovieCard from '../components/cards/MovieCard'

export default function FeedPage() {
  const [search, setSearch] = useState("")
  const categories = useSelector((state: RootState) => state.user.categories)
  const genreIds = useSelector((state: RootState) => state.user.movieGenres)
  const genreString = genreIds.length > 0 ? genreIds.join(',') : ''

  const { data: newsData, isLoading: newsLoading } = useGetTopHeadlinesQuery(categories[0])
  const { data: movieData, isLoading: movieLoading } = useGetPopularMoviesQuery(genreString)
  
  
  const filteredNews = useMemo(() =>
    search
      ? newsData?.articles.filter((n: any) =>
          n.title?.toLowerCase().includes(search.toLowerCase()) ||
          n.description?.toLowerCase().includes(search.toLowerCase())
        ) || []
      : newsData?.articles || [],
    [newsData, search]
  )

  const filteredMovies = useMemo(() =>
    search
      ? movieData?.results.filter((m: any) =>
          m.title?.toLowerCase().includes(search.toLowerCase())
        ) || []
      : movieData?.results || [],
    [movieData, search]
  )

  if (newsLoading || movieLoading) return <div>Loading...</div>
  
  return (
    <div>
    
      <div className="w-full flex justify-end my-2">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search news or movies..."
          className="py-2 px-4 rounded border outline-blue-600 dark:bg-gray-700 dark:text-white min-w-[220px]"
        />
      </div>

      <div className="text-xl font-bold mb-2">NEWS</div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredNews.length ? (
          filteredNews.map((news: any) => (
            <NewsCard key={news.url} article={news} />
          ))
        ) : (
          <div className="text-gray-400 col-span-full">No news found.</div>
        )}
      </div>
      <div className="text-xl font-bold mb-2">MOVIES</div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMovies.length ? (
          filteredMovies.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <div className="text-gray-400 col-span-full">No movies found.</div>
        )}
      </div>
    </div>
  )
}
