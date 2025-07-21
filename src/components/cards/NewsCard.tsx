"use client"
import { useDispatch, useSelector } from "react-redux"
import { addFavorite, removeFavorite } from "../../features/favorites/favoritesSlice"
import { RootState } from "../../features/store"

export default function NewsCard({ article }: { article: any }) {
  const dispatch = useDispatch()
  const favorites = useSelector((state: RootState) => state.favorites)
  const isFav = favorites.some(f => f.type === "news" && f.id === article.url)

  const handleFavorite = () => {
    if (!isFav) {
      dispatch(addFavorite({ type: 'news', id: article.url, payload: article }))
    } else {
      dispatch(removeFavorite({ type: 'news', id: article.url }))
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col h-full relative">
      <button
        onClick={handleFavorite}
        className="absolute top-2 right-2 text-2xl"
        title={isFav ? "Remove from favorites" : "Add to favorites"}
      >
        {isFav ? "❤️" : "🤍"}
      </button>
      {article.urlToImage && (
        <img src={article.urlToImage} alt="" className="rounded w-full h-40 object-cover mb-2" />
      )}
      <h3 className="font-semibold mb-2">{article.title}</h3>
      <p className="text-sm mb-2">{article.description}</p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={article.url}
        className="text-blue-600 dark:text-blue-400 font-semibold mt-auto"
      >Read More</a>
    </div>
  )
}
