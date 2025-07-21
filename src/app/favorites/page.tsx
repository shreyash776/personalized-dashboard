'use client'
import { useSelector } from 'react-redux'
import { RootState } from '../../features/store'
import NewsCard from '../../components/cards/NewsCard'
import MovieCard from '../../components/cards/MovieCard'

export default function FavoritesPage() {
  const favorites = useSelector((state: RootState) => state.favorites)
  
  const news = favorites.filter(f => f.type === 'news')
  const movies = favorites.filter(f => f.type === 'movie')

  if (favorites.length === 0) return <div className="text-lg mt-8">No favorites yet.</div>

  return (
    <div>
      <div className="text-xl font-bold mb-2">Favorite News</div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {news.map(f => (
          <NewsCard key={f.id} article={f.payload} />
        ))}
      </div>
      <div className="text-xl font-bold mb-2">Favorite Movies</div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map(f => (
          <MovieCard key={f.id} movie={f.payload} />
        ))}
      </div>
    </div>
  )
}
