import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UsersView from './UsersView'
import Blogs from './Blogs'

const BlogRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<UsersView />} />

      </Routes>
    </Router>
  )
}

export default BlogRoutes
