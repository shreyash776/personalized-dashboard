'use client'
import { useSelector } from 'react-redux'
import { useGetTopHeadlinesQuery } from '../services/newsApi'
import { RootState } from '../features/store'
import NewsCard from '../components/cards/NewsCard'

export default function FeedPage() {
  const categories = useSelector((state: RootState) => state.user.categories)
  const { data, error, isLoading } = useGetTopHeadlinesQuery(categories[0]) 
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading news</div>

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.articles.map((news: any) => (
        <NewsCard key={news.url} article={news} />
      ))}
    </div>
  )
}
