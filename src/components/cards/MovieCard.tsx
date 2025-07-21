"use client"
import { useState } from "react";
import axios from "axios";

export default function MovieCard({ movie }: { movie: any }) {
  // Optionally show loading state while fetching the trailer
  const [loading, setLoading] = useState(false);

  const handleTrailerClick = async () => {
    setLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`
      );
      // Find the first YouTube trailer
      const trailer = response.data.results.find(
        (vid: any) => vid.site === "YouTube" && vid.type === "Trailer"
      );
      if (trailer) {
        // Open trailer on YouTube in a new tab
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
      } else {
        alert("No trailer available!");
      }
    } catch (e) {
      alert("Failed to load trailer.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col h-full">
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded w-full h-40 object-cover mb-2"
        />
      )}
      <h3 className="font-semibold mb-2">{movie.title}</h3>
      <p className="text-xs text-gray-400 mb-1">
        {movie.release_date ? `Release: ${movie.release_date}` : ""}
        {movie.original_language ? ` | Lang: ${movie.original_language}` : ""}
      </p>
      <p className="text-xs text-yellow-500 mb-1">
        ★ {movie.vote_average} ({movie.vote_count} ratings)
      </p>
      <p className="text-sm mb-2">{movie.overview}</p>
      <button
        onClick={handleTrailerClick}
        disabled={loading}
        className="text-white bg-blue-600 px-3 py-1 rounded font-medium hover:bg-blue-700 mt-auto disabled:bg-blue-300"
      >
        {loading ? "Loading..." : "▶️ Watch Trailer"}
      </button>
    </div>
  );
}
