"use client";

import { useState, useEffect } from "react";
import { useGetTopHeadlinesQuery } from "../services/newsApi";
import { useGetTrendingMoviesQuery } from "../services/tmdbApi";
import NewsCard from "../components/cards/NewsCard";
import MovieCard from "../components/cards/MovieCard";
import MusicCard from "../components/cards/MusicCard";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";

export default function LandingPage() {
  const [moodInput, setMoodInput] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const musicGenres = useSelector((state: RootState) => state.user.musicGenres);


  const { data: newsData, isLoading: newsLoading } = useGetTopHeadlinesQuery("");
  const { data: moviesData, isLoading: moviesLoading } = useGetTrendingMoviesQuery(undefined);

 
  const [trendingMusic, setTrendingMusic] = useState<any[]>([]);
  const [musicLoading, setMusicLoading] = useState(true);
  const [musicError, setMusicError] = useState("");

 
  useEffect(() => {
    async function fetchMusic() {
      setMusicLoading(true);
      setMusicError("");

      try {
       
        const genreQuery = musicGenres.length > 0 ? musicGenres.join(",") : "";
        const url = genreQuery
          ? `/api/deezer/tracks?genreId=${encodeURIComponent(genreQuery)}`
          : "/api/deezer/tracks";

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch music");

        const data = await res.json();
        setTrendingMusic(data.slice(0, 6));
      } catch (e) {
        setMusicError("Failed to load music.");
      } finally {
        setMusicLoading(false);
      }
    }

    fetchMusic();
  }, [musicGenres]);

  if (newsLoading || moviesLoading || musicLoading) return <div>Loading trending content...</div>;

  return (
    <div className="min-h-screen px-6 py-8 bg-gray-50 dark:bg-gray-900 pt-24">
     
      <section className="max-w-4xl mx-auto mb-10">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">What’s your mood today?</h1>
        <input
          type="text"
          placeholder="Describe your mood or interests..."
          value={moodInput}
          onChange={(e) => setMoodInput(e.target.value)}
          className="w-full p-4 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          onClick={() => setShowCategories(true)}
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none"
        >
          Select Categories Manually
        </button>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white dark:bg-gray-800 max-w-md w-full rounded p-6">
           
            <button
              onClick={() => setShowCategories(false)}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
