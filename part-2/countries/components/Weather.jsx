import { useState, useEffect } from "react"
import weatherService from "../services/weather"

const Weather = ({ latlng }) => {
  const [weatherInfo, setWeatherInfo] = useState(null)

  useEffect(() => {
    weatherService
      .getWeatherInfo(latlng[0], latlng[1])
      .then(data => setWeatherInfo(data))
  }, [latlng])

  if (weatherInfo === null) {
    return null
  }

  return (
    <div>
      <h4>Weather in {weatherInfo.name}</h4>
      <div>temperature - {weatherInfo.main.temp} Celcius</div>
      {weatherInfo.weather.map(info => 
        <img src={`https://openweathermap.org/img/wn/${info.icon}@2x.png`}/>
      )}
      <div>wind - {weatherInfo.wind.speed} m/s</div>
    </div>
  )
}

export default Weather