import { useEffect } from 'react'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import { setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import BlogRoutes from './components/Routes'

const App = () => {
  const message = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user !== null) {
      blogService.setToken(user.token)
      blogService
        .getAll()
        .then(serverBlogs => {
          dispatch(setBlogs(serverBlogs))
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
      dispatch(setUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }, [])

  return (
    <div>
      <Notification message={message} />
      <Login />
      <h2>blogs</h2>
      <BlogRoutes />
    </div>
  )
}

export default App
