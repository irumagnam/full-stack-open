import axios from 'axios'
const api_key = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}&units=metric`

const getWeatherInfo = async (lat, lon) => {
  const requestUrl = `${baseUrl}&lat=${lat}&lon=${lon}`
  console.log('sending HTTP GET request to', requestUrl)
  const request = axios.get(requestUrl)
  return request.then(response => {
    console.log('server returned', response.data)
    return response.data
  })
}

export default { getWeatherInfo }
