import commentService from '../services/comments'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/commentsReducer'


const CommentForm = ({ blogId }) => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const comment = e.target[0].value
    e.target[0].value = ''
    commentService.createComment(blogId, comment)
      .then(response => {
        dispatch(addComment(response))
      })
  }

  return (
    <div>
      <h2>add a comment</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='add your comment here....'/>
        <button type='submit'>add comment</button>
      </form>
    </div>
  )
}

export default CommentForm