import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    if (user !== null){
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
          setBlogs( blogs )
      ).catch()
    }
  }, [user])

  return (
    <div>
      <Login user={user} setUser={setUser}/>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
