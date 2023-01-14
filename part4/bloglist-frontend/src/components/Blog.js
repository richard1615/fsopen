import {useRef, useState} from "react"
import blogService from '../services/blogs'
import Togglable from "./Togglable"

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
            type: `success`
          })
          blogFormRef.current.toggleVisibility()
        }
      )
      .catch(exception => {
        setMessage({
          text: `${exception.data}`,
          type: `error`
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
                 onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input type='text' name='author' value={author}
                 onChange={({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input type='text' name='url' value={url}
                 onChange={({target}) => setUrl(target.value)}
          />
        </div>
        <input type='submit' value='Add blog'/>
      </form>
    </Togglable>
  )
}

const Blog = ({blogs, setBlogs, setMessage}) => {
  return (
    <>
      <h2>blogs</h2>
        <BlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          setMessage={setMessage}
        />
      <ul>
        {blogs.map(blog =>
          <li key={blog.id}>{blog.title} {blog.author}</li>
        )}
      </ul>
    </>
  )
}

export default Blog