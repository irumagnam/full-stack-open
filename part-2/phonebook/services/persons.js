import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = async () => {
  console.log('sending HTTP GET request to', baseUrl)
  const request = axios.get(baseUrl)
  return request.then(response => {
    console.log('server returned', response.data)
    return response.data
  })
}

const create = async (newObject) => {
  console.log('sending HTTP POST request to', baseUrl, newObject)
  const request = axios.post(baseUrl, newObject)
  return request.then(response => {
    console.log('server returned', response.data)
    return response.data
  })
}

const update = async (id, newObject) => {
  console.log('sending HTTP PUT request to', baseUrl, newObject)
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => {
    console.log('server returned', response.data)
    return response.data
  })
}

const expire = async (id) => {
  console.log('sending HTTP DELETE request to', baseUrl, id)
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => {
    console.log('server returned', response.status, response.statusText)
  })
}

export default { getAll, create, update, expire }