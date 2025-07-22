// MusicCard.tsx
"use client"

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../features/store"
import { addFavorite, removeFavorite } from "../../features/favorites/favoritesSlice"

type Track = any;  // replace with proper type if available
type Album = any;

export default function MusicCard({ track, album }: { track?: Track; album?: Album }) {
  const dispatch = useDispatch()
  const favorites = useSelector((state: RootState) => state.favorites)

  const id = track?.id || album?.id
  const type = track ? "music-track" : album ? "music-album" : ""

  const isFav = favorites.some(f => f.type === type && f.id === id)

  const toggleFavorite = () => {
    if (!id || !type) return
    if (isFav) dispatch(removeFavorite({ type, id }))
    else dispatch(addFavorite({ type, id, payload: track ?? album }))
  }

  if (!track && !album) return null

  if (track) {
    // Render track card (same as before)
    return (
      <div className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col text-gray-900 dark:text-gray-100 relative">
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 text-2xl"
          title={isFav ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={isFav}
        >
          {isFav ? "❤️" : "🤍"}
        </button>

        {track.album?.cover_medium && (
          <img
            src={track.album.cover_medium}
            alt={track.title}
            className="rounded w-full h-40 object-cover mb-2"
          />
        )}

        <h3 className="font-semibold mb-1">{track.title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{track.artist.name}</p>

        {track.preview ? (
          <audio controls src={track.preview} className="mt-2 w-full">
            Your browser does not support audio.
          </audio>
        ) : (
          <p className="text-sm text-gray-400 mt-2">No preview available</p>
        )}

        <a
          href={track.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 font-semibold mt-2 hover:underline"
        >
          Open in Deezer
        </a>
      </div>
    )
  }

  if (album) {
    // Render album card, adjust fields accordingly
    return (
      <div className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col text-gray-900 dark:text-gray-100 relative">
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 text-2xl"
          title={isFav ? "Remove album from favorites" : "Add album to favorites"}
          aria-pressed={isFav}
        >
          {isFav ? "❤️" : "🤍"}
        </button>

        {album.cover_medium && (
          <img
            src={album.cover_medium}
            alt={album.title}
            className="rounded w-full h-40 object-cover mb-2"
          />
        )}

        <h3 className="font-semibold mb-1">{album.title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
          {album.artist?.name ?? "Unknown Artist"}
        </p>

        <a
          href={album.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 font-semibold mt-2 hover:underline"
        >
          Open Album in Deezer
        </a>
      </div>
    )
  }

  return null
}
