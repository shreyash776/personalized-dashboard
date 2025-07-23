"use client"

import { useState, useMemo } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../features/store"
import { useGetTopHeadlinesQuery } from "../../services/newsApi"
import NewsCard from "../../components/cards/NewsCard"
import { Search } from "lucide-react"
import { ClipLoader } from "react-spinners" 
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

  if (isLoading)
  return (
    <div className="pt-24 flex justify-center items-center min-h-screen bg-gray-900">
      <ClipLoader color="#3b82f6" size={48} />
    </div>
  );
  if (error) return <div className="pt-24 text-red-600 text-center">Failed to load news</div>

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8  mx-auto bg-gray-900 pb-2">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Top Headlines
        </h1>

        <div className="relative w-full sm:w-80">
  <Search className="absolute left-3 inset-y-0 my-auto text-gray-400 dark:text-gray-300 h-5 w-5" />
  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search news..."
    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
  />
</div>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.length === 0 ? (
          <div className="text-gray-400 col-span-full text-center">No news found.</div>
        ) : (
          filteredNews.map((article: Article) => (
            <NewsCard key={article.url} article={article} />
          ))
        )}
      </div>
    </div>
  )
}
