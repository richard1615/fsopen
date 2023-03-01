import Comments from './Comments'
import CommentForm from './CommentForm'

const SingleBlogView = ({ blog }) => {
  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.info}>{blog.info}</a>
      <p>{blog.likes} likes</p>
      <p>added by {blog.user.name}</p>
      <CommentForm blogId={blog.id} />
      <Comments blogId={blog.id} />
    </div>
  )
}

export default SingleBlogView