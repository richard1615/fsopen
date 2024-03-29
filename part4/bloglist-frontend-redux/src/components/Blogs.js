import Togglable from './Togglable'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { addBlog, sortBlogs } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import blogService from '../services/blogs'
import {
  clearNotification,
  setNotification,
} from '../reducers/notificationReducer'
import { Button } from '@mui/material'
import * as React from 'react'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const blogFormRef = useRef()
  const user = useSelector(state => state.user)

  if (user === null) {
    return null
  }

  const handleAddPost = newBlogObject => {
    blogService
      .create(newBlogObject)
      .then(savedBlog => {
        dispatch(addBlog(savedBlog))
        dispatch(
          setNotification({
            text: `Added ${savedBlog.title} by ${savedBlog.author}`,
            type: 'success',
          })
        )
        blogFormRef.current.toggleVisibility()
      })
      .catch(exception => {
        dispatch(
          setNotification({
            text: exception.response.data.error,
            type: 'error',
          })
        )
      })
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
  const sortByLikes = () => {
    dispatch(sortBlogs())
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleAddPost} />
      </Togglable>
      <Button variant="contained" onClick={sortByLikes}>Sort By Likes</Button>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Blogs
