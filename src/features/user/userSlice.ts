import { createSlice, PayloadAction } from '@reduxjs/toolkit'
type Preferences = { categories: string[]; darkMode: boolean }
const initialState: Preferences = { categories: ['technology'], darkMode: false }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<string[]>) {
      state.categories = action.payload
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode
    }
  }
})
export const { setCategories, toggleDarkMode } = userSlice.actions
export default userSlice.reducer
