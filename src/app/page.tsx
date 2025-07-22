"use client";

import { useState, useEffect } from "react";
import { useGetTopHeadlinesQuery } from "../services/newsApi";
import { useGetTrendingMoviesQuery } from "../services/tmdbApi";
import NewsCard from "../components/cards/NewsCard";
import MovieCard from "../components/cards/MovieCard";
import MusicCard from "../components/cards/MusicCard";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../features/store";
import { setCategories, setMovieGenres, setMusicGenres } from "../features/user/userSlice";
import axios from "axios";
import { motion } from "framer-motion";
export default function LandingPage() {
  const dispatch = useDispatch();

  const [moodInput, setMoodInput] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [loadingInference, setLoadingInference] = useState(false);
  const [inferenceError, setInferenceError] = useState("");

  const musicGenres = useSelector((state: RootState) => state.user.musicGenres);
  const newsCategoriesSelected = useSelector((state: RootState) => state.user.categories);
  const movieGenresSelected = useSelector((state: RootState) => state.user.movieGenres);

  const { data: newsData, isLoading: newsLoading } = useGetTopHeadlinesQuery("");
  const { data: moviesData, isLoading: moviesLoading } = useGetTrendingMoviesQuery(undefined);

  const [trendingMusic, setTrendingMusic] = useState<any[]>([]);
  const [musicLoading, setMusicLoading] = useState(true);
  const [musicError, setMusicError] = useState("");

  
  const DEEZER_GENRE_IDS: Record<string, number> = {
    pop: 132,
    rock: 152,
    "hip-hop": 116,
    jazz: 129,
    electronic: 106,
    classical: 98,
    country: 2,
    "r&b": 165,
    metal: 464,
    reggae: 144,
  };

  useEffect(() => {
  async function fetchMusic() {
    setMusicLoading(true);
    setMusicError("");

    try {
      console.log("🎶 Incoming musicGenres:", musicGenres);

      
      const selectedDeezerGenreIds = musicGenres
        .map((g) => {
          const id = DEEZER_GENRE_IDS[g.toLowerCase()];
          
          return id;
        })
        .filter((id): id is number => id !== undefined);

      console.log("🎯 Final genre IDs:", selectedDeezerGenreIds);

      const genreQuery = selectedDeezerGenreIds.length > 0
        ? selectedDeezerGenreIds.join(",")
        : "";

      const url = genreQuery
        ? `/api/deezer/tracks?genreName=${encodeURIComponent(genreQuery)}`
        : "/api/deezer/tracks";

      

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch music");

      const data = await res.json();
      
      setTrendingMusic(data.slice(0, 6));
    } catch (error) {
     
      setMusicError("Failed to load music.");
    } finally {
      setMusicLoading(false);
    }
  }

  fetchMusic();
}, [musicGenres]);


  const movieGenresList = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];

  const handleAnalyzeMood = async () => {
    if (!moodInput.trim()) return;
    setLoadingInference(true);
    setInferenceError("");

    try {
      const { data } = await axios.post("/api/geminiPreferences", { userInput: moodInput });

      const newsCategories = ['technology', 'business', 'sports', 'science', 'health', 'entertainment'];
      const musicGenresAvailable = [
        'pop', 'rock', 'hip-hop', 'jazz', 'electronic',
        'classical', 'country', 'r&b', 'metal', 'reggae'
      ];

      const filteredNews = Array.isArray(data.news)
        ? data.news.map((c: string) => c.toLowerCase()).filter((c: string) => newsCategories.includes(c))
        : [];

      const filteredMusic = Array.isArray(data.music)
        ? data.music.map((g: string) => g.toLowerCase()).filter((g: string) => musicGenresAvailable.includes(g))
        : [];

      const filteredMoviesIds = Array.isArray(data.movies)
        ? data.movies
          .map((name: string) =>
            movieGenresList.find(
              (g: { id: number; name: string }) => g.name.toLowerCase() === name.toLowerCase()
            )
          )
          .filter(Boolean)
          .map((g: { id: number; name: string }) => g!.id)
        : [];

      dispatch(setCategories(filteredNews));
      dispatch(setMusicGenres(filteredMusic));
      dispatch(setMovieGenres(filteredMoviesIds));

      setShowCategories(false);
    } catch (e) {
      console.error("Failed to infer preferences:", e);
      setInferenceError("Could not analyze your mood. Please try again.");
    }

    setLoadingInference(false);
  };

  if (newsLoading || moviesLoading || musicLoading) return <div>Loading trending content...</div>;

  return (
    <div className="min-h-screen px-6 py-8 bg-gray-50 dark:bg-gray-900 pt-24">

       <section className="max-w-4xl mx-auto mb-12 px-4 sm:px-6 lg:px-0">
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        What’s your mood today?
      </motion.h1>

      <motion.input
        type="text"
        placeholder="Describe your mood or interests..."
        value={moodInput}
        onChange={(e) => setMoodInput(e.target.value)}
        className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      />

     <div className="flex flex-wrap items-center gap-4 mt-6">
  <motion.button
    onClick={handleAnalyzeMood}
    disabled={loadingInference || !moodInput.trim()}
    className="px-6 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:brightness-110 disabled:opacity-50 focus:outline-none shadow-lg"
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {loadingInference ? "Analyzing..." : "Analyze Mood"}
  </motion.button>

  <motion.button
    onClick={() => setShowCategories(true)}
    className="px-6 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:brightness-110 focus:outline-none shadow-lg"
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    Select Categories Manually
  </motion.button>
</div>


      {inferenceError && (
        <motion.p
          className="text-red-600 mt-3 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {inferenceError}
        </motion.p>
      )}
    </section>

      <section className="max-w-7xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Trending News</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {newsData?.articles.slice(0, 6).map((article: any) => (
            <NewsCard key={article.url} article={article} />
          )) || <div className="text-gray-500 dark:text-gray-400">No trending news available.</div>}
        </div>
      </section>

      <section className="max-w-7xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Trending Movies</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {moviesData?.results.slice(0, 6).map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          )) || <div className="text-gray-500 dark:text-gray-400">No trending movies available.</div>}
        </div>
      </section>

      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Trending Music</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {musicError && <div className="text-red-600">{musicError}</div>}
          {trendingMusic.length > 0 ? (
            trendingMusic.map((track) => <MusicCard key={track.id} track={track} />)
          ) : (
            <div className="text-gray-500 dark:text-gray-400">No trending music available.</div>
          )}
        </div>
      </section>

      {showCategories && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 max-w-md w-full rounded p-6 overflow-auto max-h-[80vh]">
            

            <button
              onClick={() => setShowCategories(false)}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
