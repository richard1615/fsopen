import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import blogServices from '../services/blogs'


const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload)
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },
    likeBlog(state, action) {
      const id = action.payload
      const blogToLike = state.find(blog => blog.id === id)
      const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1 }
      return state.map(blog => (blog.id === id ? likedBlog : blog))
    },
  },
  extraReducers: {
    [initializeBlogs.fulfilled]: (state, action) => {
      return action.payload
    }
  }
})

export const { addBlog, deleteBlog, likeBlog } = blogSlice.actions
export default blogSlice.reducer
