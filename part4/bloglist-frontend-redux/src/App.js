import { useEffect } from 'react'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import { setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import BlogRoutes from './components/Routes'
import userServices from './services/users'
import { setUsers } from './reducers/usersReducer'

const App = () => {
  const message = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }, [])

  useEffect(() => {
    if (user !== null) {
      blogService.setToken(user.token)
      blogService.getAll()
        .then(serverBlogs => {
          dispatch(setBlogs(serverBlogs))
        })
      userServices.getAll()
        .then(users => dispatch(setUsers(users)))
    }
  }, [user])

  return (
    <div>
      <Notification message={message} />
      <Login />
      <BlogRoutes />
    </div>
  )
}

export default App
