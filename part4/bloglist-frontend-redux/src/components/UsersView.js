import userServices from '../services/users'
import { useState, useEffect } from 'react'

const UsersView = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userServices.getAll().then(users => setUsers(users))
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersView
