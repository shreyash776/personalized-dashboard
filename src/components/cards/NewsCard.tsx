"use client";

import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../features/favorites/favoritesSlice";
import { RootState } from "../../features/store";
import { motion, AnimatePresence } from "framer-motion";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";

export default function NewsCard({ article }: { article: any }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);
  const isFav = favorites.some((f) => f.type === "news" && f.id === article.url);

  const handleFavorite = () => {
    if (!isFav) {
      dispatch(addFavorite({ type: "news", id: article.url, payload: article }));
    } else {
      dispatch(removeFavorite({ type: "news", id: article.url }));
    }
  };

  return (
    <motion.div
      className="relative rounded-2xl p-[2px] bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      
      <div className="bg-white dark:bg-gray-900 rounded-[inherit] p-4 flex flex-col h-full text-gray-800 dark:text-white">
       
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

        
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="rounded-xl w-full h-40 object-cover mb-3 select-none"
            draggable={false}
          />
        )}

        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>

       
        <p className="text-sm mb-4 text-gray-600 dark:text-gray-300 line-clamp-3">{article.description}</p>

        
        <motion.a
          target="_blank"
          rel="noopener noreferrer"
          href={article.url}
          className="mt-auto inline-flex items-center gap-2 self-start px-4 py-2 rounded-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:brightness-110 focus:outline-none shadow hover:shadow-lg"
          whileHover="hover"
          initial="rest"
          animate="rest"
          variants={{
            rest: { x: 0 },
            hover: { x: 4 }
          }}
        >
          Read More
          <motion.span
            variants={{ rest: { x: 0 }, hover: { x: 6 } }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <FaArrowRight />
          </motion.span>
        </motion.a>
      </div>
    </motion.div>
  );
}
