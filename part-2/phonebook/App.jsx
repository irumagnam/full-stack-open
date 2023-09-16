import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const newPersonInstance = { name: '', number: '' }

  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({...newPersonInstance})
  const [filterText, setFilterText] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService.getAll()
      .then(data => {
        console.log('loading phone book with', data.length, 'records')
        setPersons(data)
      })
      .catch(serviceErrorHandlerDefault)
  }, [])

  const filteredPersons = filterText.trim().length === 0
    ? persons
    : persons.filter(thisPerson => 
        thisPerson.name.toLowerCase().includes(
          filterText.trim().toLowerCase()
        )
      )

  const addPerson = (event) => {
    event.preventDefault()

    const createdPerson = {
      name: newPerson.name.trim(),
      number: newPerson.number.trim(),
    }

    // make sure the data is not EMPTY
    if (createdPerson.name.length === 0 
        || createdPerson.number.length === 0) {
      alert('Please enter a name and phone number')
      return
    }

    // does this person already exist in the phone book?
    const condition = (thisPerson) => thisPerson.name === createdPerson.name
    const existingPerson = persons.find(condition)
    if (existingPerson) {
      if (!confirm(`${createdPerson.name} is already added to phonebook, replace the old number with a new one`)) {
        return
      }
    }

    if (existingPerson) {
      // update the existing person with new phone number
      const updatedPerson = {...existingPerson, number: createdPerson.number}
      personService.update(updatedPerson.id, updatedPerson)
        .then(data => {
          console.log(data.name, 'is updated successfully')
          setPersons(persons.map(p => p.id === data.id ? data : p))
          setNewPerson({...newPersonInstance})
          setMessage({ type: 'info', text:`Updated ${data.name} with new number ${data.number}`})
          setTimeout(() => setMessage(null), 5000)
        })
    } else {
      // post new person to the backend
      personService.create(createdPerson)
        .then(data => {
          console.log(data.name, 'is added successfully with id:', data.id)
          setPersons(persons.concat(data))
          setNewPerson({...newPersonInstance})
          setMessage({ type: 'info', text:`Added ${data.name}`})
          setTimeout(() => setMessage(null), 5000)
        })
        .catch(serviceErrorHandlerDefault)
    }
  }

  const serviceErrorHandlerDefault = (error) => alert(error)

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewPerson({...newPerson, name: event.target.value})
  }

  const handleNumberChange = (event) => {
    setNewPerson({...newPerson, number: event.target.value})
  }

  const handleDeletePerson = (person) => {
    if (confirm(`delete ${person.name}?`)) {
      personService.expire(person.id)
        .then(() => {
          console.log('deleted ', person.name)
          setPersons(persons.filter(thisPerson => 
            thisPerson.id !== person.id))
        })
        .catch(error => {
          setMessage({ type: 'error', text:`Information of ${person.name} has already been removed from server`})
          setTimeout(() => setMessage(null), 10000)
          setPersons(persons.filter(thisPerson => 
            thisPerson.id !== person.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter
        text={filterText}
        handleChange={handleFilterChange}
      />
      <h3>add a new</h3>
      <PersonForm
        person={newPerson} 
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleFormSubmit={addPerson}
      />
      <h3>Numbers</h3>
      <Persons 
        list={filteredPersons}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  )
}

export default App