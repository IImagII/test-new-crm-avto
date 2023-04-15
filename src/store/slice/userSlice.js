import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userDisplay: null,
  email: null,
  id: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email
      state.id = action.payload.id
      state.userDisplay = action.payload.userDisplay
    },
    removeUser(state) {
      state.email = null
      state.id = null
      state.userDisplay = null
    }
  }
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
