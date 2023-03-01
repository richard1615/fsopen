import { Routes, Route, useMatch } from 'react-router-dom'
import UsersView from './UsersView'
import Blogs from './Blogs'
import { useSelector } from 'react-redux'
import SingleUserView from './SingleUserView'
import SingleBlogView from './SingleBlogView'

const BlogRoutes = () => {
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')
  const user = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  const blog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  return (
    <>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<UsersView />} />
        <Route path="/users/:id" element={<SingleUserView user={user} />} />
        <Route path="/blogs/:id" element={<SingleBlogView blog={blog} />} />
      </Routes>
    </>
  )
}

export default BlogRoutes
