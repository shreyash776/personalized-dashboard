import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: (genreId) =>
        `discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${genreId || ''}`,
    }),
  }),
})

export const { useGetPopularMoviesQuery } = tmdbApi
