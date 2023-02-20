import { useState } from 'react'
import blogService from '../services/blogs'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import {
  clearNotification,
  setNotification,
} from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = e => {
    e.preventDefault()
    const newBlogObject = {
      title: title,
      author: author,
      url: url,
    }
    createBlog(newBlogObject)
  }

  return (
    <form action="" method="post" onSubmit={addBlog} id="blog-form">
      <div>
        title
        <input
          type="text"
          name="title"
          value={title}
          placeholder="title"
          onChange={({ target }) => setTitle(target.value)}
          id="input-title"
        />
      </div>
      <div>
        author
        <input
          type="text"
          name="author"
          value={author}
          placeholder="author"
          onChange={({ target }) => setAuthor(target.value)}
          id="input-author"
        />
      </div>
      <div>
        url
        <input
          type="text"
          name="url"
          value={url}
          placeholder="url"
          onChange={({ target }) => setUrl(target.value)}
          id="input-url"
        />
      </div>
      <button type="submit">add blog</button>
    </form>
  )
}

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
      {blog.title}, {blog.author} like: {blog.likes}
      <button onClick={() => handleLikes(blog)}>like</button>
      {deleteButton}
    </div>
  )
}

export { Blog, BlogForm }
