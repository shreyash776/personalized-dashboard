import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const FAVORITES_KEY = 'dashboard_favorites';

function loadFavorites() {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem(FAVORITES_KEY);
    if (value) return JSON.parse(value);
  }
  return [];
}

type FavoriteItem = { type: 'news' | 'movie' | 'music-album' | 'music-track'; id: string | number; payload: any }

const initialState: FavoriteItem[] =
  typeof window !== "undefined" && localStorage.getItem(FAVORITES_KEY)
    ? JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]")
    : [];

function saveFavorites(state: FavoriteItem[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(state));
  }
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      if (!state.find(f => f.id === action.payload.id && f.type === action.payload.type)) {
        state.push(action.payload);
        saveFavorites([...state]);
      }
    },
    removeFavorite: (state, action: PayloadAction<{ type: FavoriteItem['type']; id: string | number }>) => {
      const idx = state.findIndex(f => f.id === action.payload.id && f.type === action.payload.type);
      if (idx !== -1) {
        state.splice(idx, 1);
        saveFavorites([...state]);
      }
    },
  }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
