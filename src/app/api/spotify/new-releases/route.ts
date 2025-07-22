import { NextResponse } from 'next/server'
import { getNewReleases } from '../../../../lib/spotify'

export async function GET() {
  try {
    const albums = await getNewReleases()
    return NextResponse.json(albums)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch new releases' }, { status: 500 })
  }
}
