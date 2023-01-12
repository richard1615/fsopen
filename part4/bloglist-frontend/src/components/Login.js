import {useState} from "react"
import loginService from "../services/login"

const Login = ({ user, setUser, setMessage }) => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = await loginService.login({ username, password })
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(token)
            )
            setUser(token)
            setUsername('')
            setPassword('')
            setMessage({
                text: `Successfully logged in`,
                type: `success`
            })
        } catch (exception) {
            console.log(exception)
            setMessage({
                text: `${exception.data}`,
                type: `error`
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
                <form onSubmit={handleSubmit} action="" method="post">
                    <div>
                        username
                        <input type='text'
                               value={username}
                               name="Username"
                               onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input type='text'
                               value={password}
                               name="Password"
                               onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <input type='submit'/>
                </form>
            </div>
        )
    } else {
        return (
            <div>
                { user.name } logged in
                <button onClick={handleLogout}>Log Out</button>
            </div>
        )
    }
}

export default Login