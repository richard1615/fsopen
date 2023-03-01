import { createSlice } from '@reduxjs/toolkit'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload
    },
    addComment(state, action) {
      state.push(action.payload)
    }
  }
})

export const { setComments, addComment } = commentsSlice.actions
export default commentsSlice.reducer