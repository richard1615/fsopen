import blogService from '../services/blogs'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import {
  clearNotification,
  setNotification,
} from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const handleLikes = blog => {
    const updatedObject = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    const response = blogService.like(updatedObject)
    dispatch(likeBlog(blog.id))
    response.then(r => {
      dispatch(
        setNotification({
          text: `Liked ${r.title} by ${r.author}`,
          type: 'success',
        })
      )
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    })
  }

  const handleRemove = blog => {
    if (window.confirm(`remove ${blog.title} by ${blog.author}?`)) {
      blogService.remove(blog.id).then(() => {
        dispatch(deleteBlog(blog.id))
        dispatch(
          setNotification({
            text: `Removed ${blog.title} by ${blog.author}`,
            type: 'success',
          })
        )
      })
    }
  }

  const deleteButton =
    user.username === blog.user.username ? (
      <button onClick={() => handleRemove(blog)}>remove</button>
    ) : null

  return (
    <div style={blogStyle} className="blog">
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      , {blog.author} like: {blog.likes}
      <button onClick={() => handleLikes(blog)}>like</button>
      {deleteButton}
    </div>
  )
}

export default Blog
