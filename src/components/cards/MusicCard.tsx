"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { addFavorite, removeFavorite } from "../../features/favorites/favoritesSlice";
import { motion, AnimatePresence } from "framer-motion";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";

type Track = any;
type Album = any;

export default function MusicCard({ track, album }: { track?: Track; album?: Album }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);

  const id = track?.id || album?.id;
  const type = track ? "music-track" : album ? "music-album" : "";
  const item = track ?? album;
  const isFav = favorites.some(f => f.type === type && f.id === id);

  const toggleFavorite = () => {
    if (!id || !type) return;
    if (isFav) dispatch(removeFavorite({ type, id }));
    else dispatch(addFavorite({ type, id, payload: item }));
  };

  if (!item) return null;

  const cover = track?.album?.cover_medium ?? album?.cover_medium;
  const artistName = track?.artist?.name ?? album?.artist?.name ?? "Unknown Artist";
  const link = item.link;
  const title = item.title;

  return (
    <motion.div
      className="relative rounded-2xl p-[2px] bg-gradient-to-r from-blue-600 to-purple-600 shadow-md"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 250 }}
    >
      <div className="bg-white dark:bg-gray-900 rounded-[inherit] p-4 flex flex-col text-gray-800 dark:text-white relative">
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite();
          }}
          className="absolute top-3 right-3 p-1 z-10 rounded-full bg-white/10 backdrop-blur-sm shadow-md"
          title={isFav ? "Remove from favorites" : "Add to favorites"}
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

        {/* Circular Cover Image */}
        {cover && (
          <div className="flex justify-center mb-4">
            <img
              src={cover}
              alt={title}
              className="w-32 h-32 object-cover rounded-full border-[4px] border-white shadow dark:border-gray-700"
              draggable={false}
            />
          </div>
        )}

        {/* Title and Artist */}
        <h3 className="font-semibold text-lg mb-2 text-center line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">{artistName}</p>

        {/* Audio Preview */}
        {track?.preview ? (
          <audio controls src={track.preview} className="w-full mt-auto rounded">
            Your browser does not support the audio element.
          </audio>
        ) : null}

        {/* External Link */}
        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 self-start px-4 py-2 rounded-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:brightness-110 focus:outline-none shadow hover:shadow-lg"
          whileHover="hover"
          initial="rest"
          animate="rest"
          variants={{
            rest: { x: 0 },
            hover: { x: 4 },
          }}
        >
          {track ? "Listen Preview" : "Open Album"}
          <motion.span
            variants={{ rest: { x: 0 }, hover: { x: 6 } }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <FaPlay />
          </motion.span>
        </motion.a>
      </div>
    </motion.div>
  );
}
