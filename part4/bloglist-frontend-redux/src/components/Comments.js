import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import commentService from '../services/comments'
import { setComments } from '../reducers/commentsReducer'

const Comments = ({ blogId }) => {
  const comments = useSelector(state => state.comments)
  const dispatch = useDispatch()

  useEffect(() => {
    commentService.getComments(blogId)
      .then(comments => {
        dispatch(setComments(comments))
      })
  }, [])

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map(comment => <li key={comment.id}>{comment.content}</li>)}
      </ul>
    </div>
  )
}

export default Comments