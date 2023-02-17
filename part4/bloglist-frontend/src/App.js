import { useState, useEffect, useRef } from 'react'
import Login from './components/Login'
import { Blog, BlogForm } from './components/Blog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({
    text: null,
    type: '',
  })
  const blogFormRef = useRef()

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
      setMessage({
        text: `Liked ${blog.title}`,
        type: 'success',
      })
    })
  }
  const handleRemove = id => {
    const blog = blogs.find(b => b.id === id)
    if (window.confirm(`remove ${blog.title} by ${blog.author}?`)) {
      blogService.remove(id).then(() => {
        setMessage({
          text: `Removed ${blog.title}`,
          type: 'success',
        })
      })
    }
  }

  const handleAddPost = newBlogObject => {
    blogService
      .create(newBlogObject)
      .then(savedBlog => {
        setBlogs(blogs.concat(savedBlog))
        setMessage({
          text: `a new blog ${savedBlog.title} by ${savedBlog.author} added`,
          type: 'success',
        })
        blogFormRef.current.toggleVisibility()
      })
      .catch(exception => {
        setMessage({
          text: `${exception.data}`,
          type: 'error',
        })
      })
    setTimeout(() => {
      setMessage({
        text: null,
        type: '',
      })
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
      <Notification message={message} />
      <Login user={user} setUser={setUser} setMessage={setMessage} />
      {blog}
    </div>
  )
}

export default App
