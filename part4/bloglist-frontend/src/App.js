import { useState, useEffect } from 'react'
import Login from './components/Login'
import Blog from './components/Blog'
import Notification from "./components/Notification";
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

  const blog = user?<Blog blogs={blogs} setBlogs={setBlogs} setMessage={setMessage}/>:null

  return (
    <div>
      <Notification message={message}/>
      <Login user={user} setUser={setUser} setMessage={setMessage}/>
      {blog}
    </div>
  )
}

export default App
