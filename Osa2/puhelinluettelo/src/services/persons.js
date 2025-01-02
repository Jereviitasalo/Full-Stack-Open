import axios from 'axios'

const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = (newPersonObject) => {
    return axios.post(baseUrl, newPersonObject).then(response => response.data)
}

const update = (id, newPersonObject) => {
    return axios.put(`${baseUrl}/${id}`, newPersonObject).then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

export default {
    getAll: getAll,
    create: create,
    update: update,
    remove: remove
}