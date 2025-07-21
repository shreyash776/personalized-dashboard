import { createSlice } from '@reduxjs/toolkit'
const feedSlice = createSlice({
  name: 'feed',
  initialState: { items: [], status: 'idle' },
  reducers: {
    setFeed(state, action) { state.items = action.payload }
  }
})
export const { setFeed } = feedSlice.actions
export default feedSlice.reducer
