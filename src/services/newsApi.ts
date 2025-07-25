import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2/' }),
  endpoints: (builder) => ({
    getTopHeadlines: builder.query({
      query: (category) =>
        `top-headlines?country=us&category=${category}&apiKey=${NEWS_API_KEY}`
    })
  })
})

export const { useGetTopHeadlinesQuery } = newsApi
