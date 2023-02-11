import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const newAnecdoteMutation = new useMutation(createAnecdote, {
    onSuccess: (newNote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueriesData('anecdotes', anecdotes.concat(newNote))
    },
    onError: () => {
      dispatch({
        type: 'ERROR'
      })
      setTimeout(() => {
        dispatch({
          type: 'NULL'
        })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate({ content, votes: 0 })
    event.target.anecdote.value = ''
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
