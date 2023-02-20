import { Routes, Route, useMatch } from 'react-router-dom'
import UsersView from './UsersView'
import Blogs from './Blogs'
import { useSelector } from 'react-redux'
import SingleUserView from './SingleUserView'

const BlogRoutes = () => {
  const users = useSelector(state => state.users)
  const match = useMatch('/users/:id')
  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  return (
    <>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<UsersView />} />
        <Route path="/users/:id" element={<SingleUserView user={user} />} />
      </Routes>
    </>
  )
}

export default BlogRoutes
