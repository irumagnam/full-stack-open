import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = async () => {
  const requestUrl = `${baseUrl}/all`
  console.log('sending HTTP GET request to', requestUrl)
  const request = axios.get(requestUrl)
  return request.then(response => {
    console.log('server returned', response.data)
    return response.data
  })
}

const getByName = async (name) => {
  const requestUrl = `${baseUrl}/name/${name}`
  console.log('sending HTTP GET request to', requestUrl)
  const request = axios.get(requestUrl)
  return request.then(response => {
    console.log('server returned', response.data)
    return response.data
  })
}

export default { getAll, getByName }