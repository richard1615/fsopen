import { useState } from 'react'
import loginService from '../services/login'

const Login = ({ user, setUser, setMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const token = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(token))
      setUser(token)
      setUsername('')
      setPassword('')
      setMessage({
        text: 'Successfully logged in',
        type: 'success',
      })
    } catch (exception) {
      console.log(exception)
      setMessage({
        text: 'invalid username or password',
        type: 'error',
      })
    }
  }

  const handleLogout = () => {
    console.log('logged out')
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
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
