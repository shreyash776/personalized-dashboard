"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../features/store";
import {
  setCategories,
  setMovieGenres,
  setMusicGenres,
} from "../../features/user/userSlice";
import { useEffect, useState } from "react";
import axios from "axios";

const categoriesAvailable = [
  "technology",
  "business",
  "sports",
  "science",
  "health",
  "entertainment",
];

const musicGenresAvailable = [
  "pop",
  "rock",
  "hip-hop",
  "jazz",
  "electronic",
  "classical",
  "country",
  "r&b",
  "metal",
  "reggae",
];

export default function SettingsPage() {
  const dispatch = useDispatch();

  const selected = useSelector((state: RootState) => state.user.categories);
  const selectedGenres = useSelector((state: RootState) => state.user.movieGenres);
  const selectedMusicGenres = useSelector(
    (state: RootState) => state.user.musicGenres
  );

  const [genreList, setGenreList] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
        );
        setGenreList(response.data.genres);
      } catch {
        setGenreList([]);
      }
    }
    fetchGenres();
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboard_categories", JSON.stringify(selected));
  }, [selected]);

  useEffect(() => {
    localStorage.setItem("dashboard_movieGenres", JSON.stringify(selectedGenres));
  }, [selectedGenres]);

  useEffect(() => {
    localStorage.setItem("dashboard_musicGenres", JSON.stringify(selectedMusicGenres));
  }, [selectedMusicGenres]);

  // Toggle handlers for chips
  const toggleCategory = (cat: string) => {
    if (selected.includes(cat)) {
      dispatch(setCategories(selected.filter((c) => c !== cat)));
    } else {
      dispatch(setCategories([...selected, cat]));
    }
  };

  const toggleGenre = (id: number) => {
    if (selectedGenres.includes(id)) {
      dispatch(setMovieGenres(selectedGenres.filter((g) => g !== id)));
    } else {
      dispatch(setMovieGenres([...selectedGenres, id]));
    }
  };

  const toggleMusicGenre = (genre: string) => {
    if (selectedMusicGenres.includes(genre)) {
      dispatch(setMusicGenres(selectedMusicGenres.filter((g) => g !== genre)));
    } else {
      dispatch(setMusicGenres([...selectedMusicGenres, genre]));
    }
  };

  // Chip component
  const Chip = ({
    children,
    selected,
    onClick,
  }: {
    children: React.ReactNode;
    selected: boolean;
    onClick: () => void;
  }) => {
    return (
      <button
        onClick={onClick}
        className={`cursor-pointer select-none rounded-full px-4 py-1 border transition-colors duration-150
          ${
            selected
              ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* News Categories */}
      <h2 className="text-2xl font-bold mb-3">Content Preferences</h2>
      <div className="flex flex-wrap gap-3 mb-6">
        {categoriesAvailable.map((cat) => (
          <Chip key={cat} selected={selected.includes(cat)} onClick={() => toggleCategory(cat)}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Chip>
        ))}
      </div>
      <p className="mb-8 text-gray-600 dark:text-gray-400 text-sm">
        Your dashboard will show news from your selected categories.
      </p>

      {/* Movie Genres */}
      <h2 className="text-2xl font-bold mb-3">Movie Genre Preferences</h2>
      <div className="flex flex-wrap gap-3 mb-6">
        {genreList.length === 0 && <p className="text-gray-500 dark:text-gray-400">Loading genres...</p>}
        {genreList.map((genre) => (
          <Chip
            key={genre.id}
            selected={selectedGenres.includes(genre.id)}
            onClick={() => toggleGenre(genre.id)}
          >
            {genre.name}
          </Chip>
        ))}
      </div>
      <p className="mb-8 text-gray-600 dark:text-gray-400 text-sm">
        Your dashboard will show movies from your selected genres.
      </p>

      {/* Music Genres */}
      <h2 className="text-2xl font-bold mb-3">Music Preferences</h2>
      <div className="flex flex-wrap gap-3">
        {musicGenresAvailable.map((genre) => (
          <Chip
            key={genre}
            selected={selectedMusicGenres.includes(genre)}
            onClick={() => toggleMusicGenre(genre)}
          >
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </Chip>
        ))}
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
        Your dashboard will show music from your selected genres.
      </p>
    </div>
  );
}
