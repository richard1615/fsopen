import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = e => {
    e.preventDefault()
    const newBlogObject = {
      title: title,
      author: author,
      url: url,
    }
    createBlog(newBlogObject)
  }

  return (
    <form action="" method="post" onSubmit={addBlog} id="blog-form">
      <div>
        title
        <input
          type="text"
          name="title"
          value={title}
          placeholder="title"
          onChange={({ target }) => setTitle(target.value)}
          id="input-title"
        />
      </div>
      <div>
        author
        <input
          type="text"
          name="author"
          value={author}
          placeholder="author"
          onChange={({ target }) => setAuthor(target.value)}
          id="input-author"
        />
      </div>
      <div>
        url
        <input
          type="text"
          name="url"
          value={url}
          placeholder="url"
          onChange={({ target }) => setUrl(target.value)}
          id="input-url"
        />
      </div>
      <button type="submit">add blog</button>
    </form>
  )
}

const Blog = ({ blog, user, handleRemove, handleLikes }) => {
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
      {blog.title}, {blog.author} like: {blog.likes}
      <button onClick={handleLikes}>like</button>
      {deleteButton}
    </div>
  )
}

export { Blog, BlogForm }
