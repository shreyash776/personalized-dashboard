'use client'

import { useGetTopHeadlinesQuery } from '../../services/newsApi'
import { useGetTrendingMoviesQuery } from '../../services/tmdbApi'
import NewsCard from '../../components/cards/NewsCard'
import MovieCard from '../../components/cards/MovieCard'

export default function TrendingPage() {
  
  const { data: newsData, isLoading: newsLoading } = useGetTopHeadlinesQuery('')
  
 const { data: moviesData, isLoading: moviesLoading } = useGetTrendingMoviesQuery(undefined)

  if (newsLoading || moviesLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Trending</h1>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Trending News</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {newsData?.articles.slice(0, 6).map((article: any) => (
            <NewsCard key={article.url} article={article} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Trending Movies</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {moviesData?.results.slice(0, 6).map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  )
}
