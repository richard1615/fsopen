import { newAnecdote } from "../reducers/anecdoteReducer"
import { selectNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"


const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const add = async (e) => {
    e.preventDefault()
    const content = e.target.note.value
    e.target.note.value = ''
    dispatch(newAnecdote(content))
    dispatch(selectNotification(`you created '${content}'`, 5))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={(e) => add(e)}>
        <div><input name='note'/></div>
        <button type='submit'>
          create
        </button>
      </form>
    </>
  )
}

export default AnecdoteForm