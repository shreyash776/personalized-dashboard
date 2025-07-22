"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../features/favorites/favoritesSlice";
import { RootState } from "../../features/store";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FiVideo } from "react-icons/fi";

export default function MovieCard({ movie }: { movie: any }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);
  const isFav = favorites.some((f) => f.type === "movie" && f.id === movie.id);

  const handleFavorite = () => {
    if (!isFav) {
      dispatch(addFavorite({ type: "movie", id: movie.id, payload: movie }));
    } else {
      dispatch(removeFavorite({ type: "movie", id: movie.id }));
    }
  };

  const handleTrailerClick = async () => {
    setLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`
      );
      const trailer = response.data.results.find(
        (vid: any) => vid.site === "YouTube" && vid.type === "Trailer"
      );
      if (trailer) {
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
      } else {
        alert("No trailer available.");
      }
    } catch {
      alert("Failed to load trailer.");
    }
    setLoading(false);
  };

  return (
    <motion.div
      className="relative rounded-2xl p-[2px] bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="bg-white dark:bg-gray-900 rounded-[inherit] p-4 flex flex-col h-full text-gray-800 dark:text-white">
        {/* Heart Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleFavorite();
          }}
          className="absolute top-3 right-3 p-1 z-10 rounded-full bg-white/10 backdrop-blur-sm shadow-md"
          title={isFav ? "Remove from favorites" : "Add to favorites"}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          <AnimatePresence mode="wait">
            {isFav ? (
              <motion.span
                key="filled"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-red-500 text-xl"
              >
                <AiFillHeart />
              </motion.span>
            ) : (
              <motion.span
                key="outline"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-white text-xl border border-white rounded-full p-[1px]"
              >
                <AiOutlineHeart />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Poster Image */}
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-xl w-full h-40 object-cover mb-3 select-none"
            draggable={false}
          />
        )}

        {/* Title */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{movie.title}</h3>

        {/* Overview */}
        <p className="text-sm mb-4 text-gray-600 dark:text-gray-300 line-clamp-3">
          {movie.overview}
        </p>

        {/* Trailer Button */}
        <motion.button
          onClick={handleTrailerClick}
          disabled={loading}
          className="mt-auto inline-flex items-center gap-2 self-start px-4 py-2 rounded-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:brightness-110 focus:outline-none shadow hover:shadow-lg disabled:cursor-not-allowed disabled:bg-indigo-400"
          whileHover="hover"
          initial="rest"
          animate="rest"
          variants={{
            rest: { x: 0 },
            hover: { x: 4 },
          }}
        >
          {loading ? "Loading..." : "Watch Trailer"}
          {!loading && (
            <motion.span
              variants={{ rest: { x: 0 }, hover: { x: 6 } }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <FiVideo />
            </motion.span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
