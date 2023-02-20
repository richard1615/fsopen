import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    sortBlogs(state, action) {
      return state.sort((a, b) => b.likes - a.likes)
    },
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
})

export const { setBlogs, addBlog, deleteBlog, likeBlog, sortBlogs } = blogSlice.actions
export default blogSlice.reducer
