import { useState } from 'react'
import { Paper, styled, TextField, Button } from '@mui/material'
import * as React from 'react'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}))

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
      <Item>
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          type="text"
          name="Title"
          value={title}
          placeholder="title"
          onChange={({ target }) => setTitle(target.value)}
          id="input-title"
        />
      </Item>
      <Item>
        <TextField
          fullWidth
          label="Author"
          variant="outlined"
          type="text"
          name="author"
          value={author}
          placeholder="author"
          onChange={({ target }) => setAuthor(target.value)}
          id="input-author"
        />
      </Item>
      <Item>
        <TextField
          fullWidth
          label="URL"
          variant="outlined"
          type="text"
          name="url"
          value={url}
          placeholder="url"
          onChange={({ target }) => setUrl(target.value)}
          id="input-url"
        />
      </Item>
      <Button variant="contained" onClick={addBlog}>Add Blog</Button>
    </form>
  )
}

export default BlogForm