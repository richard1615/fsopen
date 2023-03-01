import { useState } from 'react'

const Blog = ({ blog, user, handleRemove, handleLikes }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const deleteButton =
    user.username === blog.user.username ? (
      <button onClick={handleRemove}>remove</button>
    ) : null

  return (
    <div style={blogStyle} className="blog">
      {blog.title}, {blog.author}
      <button onClick={() => setVisible(!visible)}>{visible?'hide':'view'}</button>
      <button onClick={handleLikes}>like</button>
      {deleteButton}
      {visible?(
        <>
          <p>{blog.url}</p>
          <p>likes: {blog.likes}</p>
          <p>by: {blog.user.name}</p>
        </>
      ):null}
    </div>
  )
}

export default Blog
