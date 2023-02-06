import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"


const AnecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload.id
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = {...anecdoteToVote, votes: anecdoteToVote.votes + 1}
      return state.map(a => a.id === id ? votedAnecdote : a)
    },
    createAnecdote(state, action) {
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeNotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const newAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteForAnecdote = (id) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(id)
    dispatch(voteAnecdote(updatedAnecdote))
  }
}

export const { voteAnecdote, createAnecdote, setAnecdotes } = AnecdoteSlice.actions
export default AnecdoteSlice.reducer