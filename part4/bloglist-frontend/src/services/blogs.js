import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const getOne = id => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const like = async updatedBlog => {
  const config = {
    headers: { Authorization: token },
  }
  const id = updatedBlog.id
  console.log(id)
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  console.log(response.data)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default {
  getAll,
  setToken,
  create,
  getOne,
  like,
  remove,
}
