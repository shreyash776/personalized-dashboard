import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type FavoriteItem = { type: 'news' | 'movie'; id: string | number; payload: any }
// id can be article.url (unique) or movie.id

const initialState: FavoriteItem[] = []

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      
      if (!state.find(f => f.id === action.payload.id && f.type === action.payload.type)) {
        state.push(action.payload)
      }
    },
    removeFavorite: (state, action: PayloadAction<{ type: 'news' | 'movie'; id: string | number }>) =>
      state.filter(f => !(f.id === action.payload.id && f.type === action.payload.type))
  }
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer
