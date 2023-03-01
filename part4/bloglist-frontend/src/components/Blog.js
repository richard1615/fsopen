const Blog = ({ blog, user, handleRemove, handleLikes }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  console.log(blog.user)

  const deleteButton =
    user.username === blog.user.username ? (
      <button onClick={handleRemove}>remove</button>
    ) : null

  return (
    <div style={blogStyle} className="blog">
      {blog.title}, {blog.author} like: {blog.likes}
      <button onClick={handleLikes}>like</button>
      {deleteButton}
    </div>
  )
}

export default Blog
