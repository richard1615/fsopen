import {createAnecdote} from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const add = (e) => {
    e.preventDefault()
    const content = e.target.note.value
    e.target.note.value = ''
    dispatch(createAnecdote(content))
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