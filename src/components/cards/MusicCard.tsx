"use client"

export default function MusicCard({ album }: { album: any }) {
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col h-full text-gray-900 dark:text-gray-100">
      {album.images && album.images.length > 0 && (
        <img src={album.images[0].url} alt={album.name} className="rounded w-full h-40 object-cover mb-2" />
      )}
      <h3 className="font-semibold mb-2">{album.name}</h3>
      <p className="text-sm mb-2">{album.artists.map((a: any) => a.name).join(", ")}</p>
      <a
        href={album.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 font-semibold mt-auto hover:underline"
      >
        Open in Spotify
      </a>
    </div>
  )
}
