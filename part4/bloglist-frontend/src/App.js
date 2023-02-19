import { useState, useEffect, useRef } from 'react'
import Login from './components/Login'
import { Blog, BlogForm } from './components/Blog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import {
  setNotification,
  clearNotification,
} from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const message = useSelector(state => state)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    if (user !== null) {
      blogService.setToken(user.token)
      blogService
        .getAll()
        .then(serverBlogs => {
          setBlogs(serverBlogs)
        })
        .catch()
    } else {
      setBlogs([])
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLikes = id => {
    const blog = blogs.find(b => b.id === id)
    const updatedObject = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    const response = blogService.like(updatedObject)
    setBlogs(blogs.map(b => (b.id === id ? updatedObject : b)))
    response.then(r => {
      console.log(r)
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
  const handleRemove = id => {
    const blog = blogs.find(b => b.id === id)
    if (window.confirm(`remove ${blog.title} by ${blog.author}?`)) {
      blogService.remove(id).then(() => {
        dispatch(
          setNotification({
            text: `Removed ${blog.title} by ${blog.author}`,
            type: 'success',
          })
        )
      })
    }
  }

  const handleAddPost = newBlogObject => {
    blogService
      .create(newBlogObject)
      .then(savedBlog => {
        setBlogs(blogs.concat(savedBlog))
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
    const blogCopy = [...blogs]
    blogCopy.sort((a, b) => b.likes - a.likes)
    setBlogs(blogCopy)
  }

  const blog = user ? (
    <>
      <h2>blogs</h2>
      <button onClick={sortByLikes}>Sort by likes</button>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        f
        <BlogForm createBlog={handleAddPost} />
      </Togglable>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikes={() => handleLikes(blog.id)}
          handleRemove={() => handleRemove(blog.id)}
          user={user}
        />
      ))}
    </>
  ) : null

  return (
    <div>
      <Notification message={message.notifications} />
      <Login user={user} setUser={setUser} />
      {blog}
    </div>
  )
}

export default App
