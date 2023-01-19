import { useState, useEffect } from 'react'
import Login from './components/Login'
import { Blog, BlogForm } from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [ user, setUser ] = useState(null)
  const [ message, setMessage ] = useState({
    text: null,
    type: ''
  })

  useEffect(() => {
    if (user !== null){
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      ).catch()
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

  const sortByLikes = () => {
    const blogCopy = [...blogs]
    blogCopy.sort((a, b) => b.likes - a.likes)
    setBlogs(blogCopy)
  }

  const blog = user?
    <>
      <Notification message={message}/>
      <h2>blogs</h2>
      <button onClick={sortByLikes}>Sort by likes</button>
      <BlogForm setBlogs={setBlogs} setMessage={setMessage} blogs={blogs}/>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} setMessage={setMessage} user={user}/>)}
    </>
    :null

  return (
    <div>
      <Login user={user} setUser={setUser} setMessage={setMessage}/>
      {blog}
    </div>
  )
}

export default App
