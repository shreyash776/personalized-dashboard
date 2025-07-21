"use client"
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userReducer from './user/userSlice'
import feedReducer from './feed/feedSlice'
import favoritesReducer from './favorites/favoritesSlice'
import { newsApi } from '../services/newsApi'
export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    favorites: favoritesReducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
