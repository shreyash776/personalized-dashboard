export default function NewsCard({ article }: { article: any }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col h-full">
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
