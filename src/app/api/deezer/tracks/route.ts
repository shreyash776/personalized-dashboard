import { NextResponse } from "next/server"
import { getTrendingTracks, getTracksByGenre } from "../../../../lib/deezer"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const genreIdParam = url.searchParams.get("genreId") || ""

    
    const genreIds = genreIdParam
      .split(",")
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id))

    let tracks: any[] = []

    if (genreIds.length === 0) {
    
      tracks = await getTrendingTracks()
    } else {
     
      tracks = []
      for (const genreId of genreIds) {
        const genreTracks = await getTracksByGenre(genreId)
        tracks = [...tracks, ...genreTracks]
      }
    }

    return NextResponse.json(tracks)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch tracks" }, { status: 500 })
  }
}
