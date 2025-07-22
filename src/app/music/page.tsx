"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import MusicCard from "../../components/cards/MusicCard";

export default function MusicPage() {
  const musicGenres = useSelector((state: RootState) => state.user.musicGenres);
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTracks() {
      setLoading(true);
      setError("");

      try {
       
        const genreQuery = musicGenres.length > 0 ? musicGenres.join(",") : "";
        const url = genreQuery
          ? `/api/deezer/tracks?genreName=${encodeURIComponent(genreQuery)}`
          : "/api/deezer/tracks";

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch tracks");

        const data = await res.json();
        setTracks(data);
      } catch (e) {
        setError("Failed to load tracks.");
      } finally {
        setLoading(false);
      }
    }

    fetchTracks();
  }, [musicGenres]);

  if (loading) return <div>Loading tracks...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (tracks.length === 0) return <div>No tracks available</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {musicGenres.length > 0 ? "Tracks Based on Your Selected Genres" : "Trending Tracks (Deezer)"}
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map((track) => (
          <MusicCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
}
