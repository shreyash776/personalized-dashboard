"use client"

import { useState, useMemo } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../features/store"
import { useGetTopHeadlinesQuery } from "../../services/newsApi"  
import NewsCard from "../../components/cards/NewsCard"

export default function NewsPage() {
  const categories = useSelector((state: RootState) => state.user.categories)
  const [search, setSearch] = useState("")

  const category = categories[0] || "technology"
  const { data: newsData, isLoading, error } = useGetTopHeadlinesQuery(category)

  type Article = {
    url: string
    title?: string
    description?: string
    
  }

  const filteredNews = useMemo(() => {
    if (!newsData?.articles) return []
    if (!search) return newsData.articles

    return newsData.articles.filter(
      (article: Article) =>
        article.title?.toLowerCase().includes(search.toLowerCase()) ||
        article.description?.toLowerCase().includes(search.toLowerCase())
    )
  }, [newsData, search])

  if (isLoading) return <div>Loading news…</div>
  if (error) return <div className="text-red-600">Failed to load news</div>

  return (
    <div>
      <div className="w-full flex justify-end my-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search news..."
          className="py-2 px-4 rounded border outline-blue-600 dark:bg-gray-700 dark:text-white min-w-[220px]"
        />
      </div>

      <h1 className="text-3xl font-bold mb-6">News</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNews.length === 0 ? (
          <div className="text-gray-400 col-span-full">No news found.</div>
        ) : (
          filteredNews.map((article: Article) => <NewsCard key={article.url} article={article} />)
        )}
      </div>
    </div>
  )
}
