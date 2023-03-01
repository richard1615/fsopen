import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/comments'

const getComments = (blogId) => {
  const request = axios.get(`${baseUrl}/${blogId}`)
  return request.then(response => response.data)
}

const createComment = async (blogId, newComment) => {
  const commentToPost = {
    content: newComment,
    blog: blogId
  }
  const response = await axios.post(`${baseUrl}/${blogId}`, commentToPost)
  return response.data
}

export default { getComments, createComment }