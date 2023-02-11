import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export const createAnecdote = async (anecdote) => {
  const newAnecdote = await axios.post(baseUrl, anecdote)
  return newAnecdote.data
}

export const updateAnecdote = async (anecdote) => {
  const updatedAnecdote = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return updatedAnecdote.data
}