'use client'
import { useGetTopHeadlinesQuery } from '../services/newsApi'
import { useGetPopularMoviesQuery } from '../services/tmdbApi'
import { useSelector } from 'react-redux'
import { RootState } from '../features/store'
import NewsCard from '../components/cards/NewsCard'
import MovieCard from '../components/cards/MovieCard'

export default function FeedPage() {
  const categories = useSelector((state: RootState) => state.user.categories)
  const genreIds = useSelector((state: RootState) => state.user.movieGenres)
  const genreString = genreIds.length > 0 ? genreIds.join(',') : ''

  const { data: newsData, isLoading: newsLoading } = useGetTopHeadlinesQuery(categories[0])
  const { data: movieData, isLoading: movieLoading } = useGetPopularMoviesQuery(genreString)
  
  if (newsLoading || movieLoading) return <div>Loading...</div>
  
  return (
    <div>
      <div className="text-xl font-bold mb-2">NEWS</div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {newsData?.articles.map((news: any) => (
          <NewsCard key={news.url} article={news} />
        ))}
      </div>
      <div className="text-xl font-bold mb-2">MOVIES</div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movieData?.results.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
