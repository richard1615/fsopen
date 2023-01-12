import {useState} from "react"
import loginService from "../services/login"

const Login = ({ user, setUser }) => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = await loginService.login({ username, password })
            setUser(token)
            setUsername('')
            setPassword('')
        } catch (exception) {
            console.log(exception)
        }
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
            </div>
        )
    }
}

export default Login