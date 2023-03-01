import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
    </div>
  )
}

export default Navbar