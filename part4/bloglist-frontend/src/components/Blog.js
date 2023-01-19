import { useRef, useState } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const BlogForm = ({ setMessage, setBlogs, blogs }) => {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')
  const blogFormRef = useRef()

  const handleAddPost = (e) => {
    e.preventDefault()
    const newBlogObject = {
      title: title,
      author: author,
      url: url
    }
    blogService.create(newBlogObject)
      .then(
        savedBlog => {
          setBlogs(blogs.concat(savedBlog))
          setMessage({
            text: `a new blog ${savedBlog.title} by ${savedBlog.author} added`,
            type: 'success'
          })
          blogFormRef.current.toggleVisibility()
        }
      )
      .catch(exception => {
        setMessage({
          text: `${exception.data}`,
          type: 'error'
        })
      })
    setTimeout(() => {
      setMessage({
        text: null,
        type: ''
      })
    }, 5000)
  }

  return (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <form action="" method="post" onSubmit={handleAddPost}>
        <div>
          title
          <input type='text' name='title' value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input type='text' name='author' value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input type='text' name='url' value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <input type='submit' value='Add blog'/>
      </form>
    </Togglable>
  )
}

const Blog = ({ blog, setMessage, user }) => {
  const [ details, setDetails ] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  let blogDetails = null
  const deleteButton = user.username
    === blog.user.username
    ?<button onClick={() => handleRemove(blog.id)}>remove</button>
    :null
  const getBlogDetails = (id) => {
    const response = blogService.getOne(id)
    response.then(r => {
      blogDetails =
        (<>
          <p>{r.url}</p>
          <p>likes: {r.likes}</p>
          <p>{r.user.username}</p>
        </>)
    }
    )
  }
  const handleLikes = () => {
    const updatedObject = { ...blog, likes: blog.likes + 1, user:blog.user.id }
    const response = blogService.like(updatedObject)
    response.then(r => {
      console.log(r)
      setMessage({
        text: `Liked ${blog.title}`,
        type: 'success'
      })
    })
  }
  const handleRemove = (id) => {
    if (window.confirm(`remove ${blog.title} by ${blog.author}?`)) {
      blogService.remove(id)
        .then(r => {
          setMessage({
            text: `Removed ${blog.title}`,
            type: 'success'
          })
        })
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button onClick={() => handleLikes(blog.id)}>like</button>
      {deleteButton}
    </div>
  )
}

export {
  Blog,
  BlogForm
}