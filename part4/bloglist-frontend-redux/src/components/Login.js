import { useState } from 'react'
import loginService from '../services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const token = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(token))
      dispatch(setUser(token))
      setUsername('')
      setPassword('')
      dispatch(setNotification(`Logged in as ${token.name}`, 'success'))
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification('Wrong username or password', 'error'))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(setUser(null))
  }

  if (user === null) {
    return (
      <>
        <form onClick={handleSubmit}>
          <input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
          <input type='text' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit">login</button>
        </form>
      </>
    )
  }
  return (
    <button onClick={handleLogout}>logout</button>
  )
}

export default Login
