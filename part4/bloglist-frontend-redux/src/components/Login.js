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
      <div>
        <h1>log in to application</h1>
        <form onSubmit={handleSubmit} action="" method="post" id="login-form">
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              id="input-username"
            />
          </div>
          <div>
            password
            <input
              type="text"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              id="input-password"
            />
          </div>
          <input type="submit" value="log in" />
        </form>
      </div>
    )
  } else {
    return (
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>Log Out</button>
      </div>
    )
  }
}

export default Login
