export async function getTrendingTracks() {
  const res = await fetch("https://api.deezer.com/chart/0/tracks?limit=20&output=jsonp", {
    cache: "no-store"
  });

  const text = await res.text();
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('JSONP wrapper not found');
  const jsonStr = text.substring(start, end + 1);
  const data = JSON.parse(jsonStr);

  return data.data;
}

export async function getTracksByGenre(genreId: number) {
  const resArtists = await fetch(`https://api.deezer.com/genre/${genreId}/artists?output=jsonp`, {
    cache: "no-store"
  });

  const textArtists = await resArtists.text();
  const startA = textArtists.indexOf('{');
  const endA = textArtists.lastIndexOf('}');
  if (startA === -1 || endA === -1) throw new Error('JSONP wrapper not found in artist response');
  const jsonStrArtists = textArtists.substring(startA, endA + 1);
  const dataArtists = JSON.parse(jsonStrArtists);

  const artists = dataArtists.data.slice(0, 5); 

  let tracks: any[] = [];

  for (const artist of artists) {
    const resTracks = await fetch(`https://api.deezer.com/artist/${artist.id}/top?limit=3&output=jsonp`, {
      cache: "no-store"
    });

    const textTracks = await resTracks.text();
    const startT = textTracks.indexOf('{');
    const endT = textTracks.lastIndexOf('}');
    if (startT === -1 || endT === -1) throw new Error('JSONP wrapper not found in track response');
    const jsonStrTracks = textTracks.substring(startT, endT + 1);
    const dataTracks = JSON.parse(jsonStrTracks);

    tracks = [...tracks, ...dataTracks.data];
  }

  return tracks;
}
