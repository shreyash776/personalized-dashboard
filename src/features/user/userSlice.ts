import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Preferences = {
  categories: string[]
  darkMode: boolean
  movieGenres: number[]
}

const initialState: Preferences = {
  categories: ['technology'],
  darkMode: false,  // default value; do NOT read from localStorage here
  movieGenres: []
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<string[]>) {
      state.categories = action.payload
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload
    },
    setMovieGenres(state, action: PayloadAction<number[]>) {
      state.movieGenres = action.payload
    }
  }
})

export const { setCategories, toggleDarkMode, setDarkMode, setMovieGenres } = userSlice.actions
export default userSlice.reducer
