import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Notification from './components/Notification'
import Countries from './components/Countries'
import Country from './components/Country'

const App = () => {
  const limitDisplayTo = 10
  const [countryText, setCountryText] = useState('')
  const [countryList, setCountryList] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [showCountry, setShowCountry] = useState(null)
  const [message, setMessage] = useState({})

  // fetch data for all countries after the first render
  useEffect(() => {
    console.log('fetching countries...')
    countryService.getAll()
      .then(data => {
        setCountryList(data)
        setMessage({ type: 'info', text:`loaded ${data.length} countries`})
        setTimeout(() => setMessage(null), 10000)
      })
      .catch(error => {
        setMessage({ type: 'error', text:`Unable to load data from server`})
        setTimeout(() => setMessage(null), 10000)
      })
  }, [])

  const handleShowCountry = (country) => {
    setShowCountry(country)
  }

  const handleChange = (event) => {
    setCountryText(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setShowCountry(null)
    if (countryText.trim().length == 0) {
      setMessage({type: 'error', text: 'Please enter search input'})
      setTimeout(() => setMessage({}), 5000)
      setFilteredList([])
    } else {
      const newList = countryList.filter(country => 
        country.name.common.toLowerCase().indexOf(
          countryText.trim().toLowerCase()) >= 0)
      console.log('found', newList.length, 'countries matching the search criteria');
      setFilteredList(newList)
      if (filteredList.length === 1) {
        setShowCountry(filteredList[0])
      }
    }
  }

  return (
    <div>
      <Notification message={message} />
      <form onSubmit={onSearch}>
        find countries: <input value={countryText} onChange={handleChange} />
      </form>
      <div className="container">
        <div className="column">
        {
          filteredList.length > 1 && filteredList.length <= limitDisplayTo
          && <Countries list={filteredList} handleShowCountry={handleShowCountry}/>
        }
        {
          filteredList.length > limitDisplayTo
          && <p>Too many matches, specify another filter</p>
        }
        </div>
        <div className="column">
        {
          showCountry
          && <Country info={showCountry} />
        }
        </div>
      </div>
    </div>
  )
}

export default App