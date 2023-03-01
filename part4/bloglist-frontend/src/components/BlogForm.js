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

export default BlogForm