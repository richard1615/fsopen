import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from "react-query"
import { getAll, updateAnecdote } from "./requests"
import { useNotificationDispatch } from "./NotificationContext"


const App = () => {
  const result = useQuery('anecdotes', getAll, {
    retry: 1,
    refetchOnWindowFocus: false
  })
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const voteMutation = new useMutation(updateAnecdote, {
    onSuccess: () => {
      return queryClient.invalidateQueries('anecdotes')
    }
  })


  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    const toUpdate = {...anecdote, votes: anecdote.votes + 1}
    voteMutation.mutate(toUpdate)
    dispatch({
      type: 'VOTE',
      payload: anecdote.content
    })
    setTimeout(() => {
      dispatch({
        type: 'NULL'
      })
    }, 5000)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
