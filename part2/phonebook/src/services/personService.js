import axios from 'axios'

const baseUrl = "http://localhost:3001/api/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteObject = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const editObject = (editedObject) => {
    const request = axios.put(`${baseUrl}/${editedObject.id}`, editedObject)
    return request.then((response) => response.data)
}

const personService = { getAll, create, deleteObject, editObject }

export default personService