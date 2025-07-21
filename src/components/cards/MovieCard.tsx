export default function MovieCard({ movie }: { movie: any }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col h-full">
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt=""
          className="rounded w-full h-40 object-cover mb-2"
        />
      )}
      <h3 className="font-semibold mb-2">{movie.title}</h3>
      <p className="text-sm mb-2">{movie.overview}</p>
      
    </div>
  )
}
