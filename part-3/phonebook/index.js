const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

// allow CORS (Corss-Origin-Resource-Sharing)
app.use(cors())

// register assets folder
app.use(express.static('dist'))

// register json parser
app.use(express.json())

// register request logger
morgan.token('req-body', function getRequestBody (req) {
  return (req.method === 'POST' || req.method === 'PUT')
    ? JSON.stringify(req.body)
    : ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

let persons =  [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const generateId = () => {
  return persons.length === 0 ? 1
  : Math.max(...persons.map(p => p.id)) + 1
}

const findPersonById = (id) => {
  return persons.find(p => p.id === id)
}

const findPersonByName = (name) => {
  return persons.find(p => 
    p.name.toLowerCase() === name.trim().toLowerCase()
  )
}

app.get('/info', (request, response) => {
  response.send(`
    <p>Phonebook has infor for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
  .end()
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = findPersonById(id)
  if (person) {
    console.log('found', person)
    response.json(person)
  } else {
    console.log('not found')
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  // gather request data
  const reqData = request.body

  // run validations
  let messages = null
  if (!reqData.name || !reqData.number) {
    messages = {
      error: 'no name and/or phone number provided'
    }
  } else if (findPersonByName(reqData.name)) {
    messages = {
      error: 'name must be unique'
    }
  }

  // send '400 - BAD REQUEST' in case of validation errors
  if (messages !== null) {
    console.log('validation failed', messages)
    return response.status(400).json(messages)
  }

  // construct new person
  const newPerson = {
    name: reqData.name,
    number: reqData.number,
    id: generateId(),
  }
 
  // add new person to the list
  console.log('creating person', newPerson)
  persons = persons.concat(newPerson)

  // send back newly created person
  response.json(newPerson)
})

app.put('/api/persons/:id', (request, response) => {
  // gather request data
  const personId = Number(request.params.id)
  const reqData = request.body

  // run validations
  if (!reqData.name || !reqData.number) {
    const respData = {
      error: 'no name and/or phone number provided'
    }
    console.log('validation failed', respData)
    return response.status(400).json(respData)
  }

  // find person and update
  if (findPersonById(personId)) { // person exists
    const existingPerson = {
      name: reqData.name,
      number: reqData.number,
      id: personId,
    }
    // replace old person with new person on the list
    console.log('updating person', existingPerson)
    persons = persons.map(n => n.id === personId ? existingPerson : n)

    // send back updated person
    response.json(existingPerson)

  } else { // person does not exist
    const respData = {
      error: 'person not found. may have been removed already!'
    }
    console.log('validation failed', respData)
    return response.status(400).json(respData)
  }
})

app.delete('/api/persons/:id', (request, response) => {
  // gather request data
  const id = Number(request.params.id)

  // remove person from the list
  persons = persons.filter(person => person.id !== id)

  return response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log('server is running on port', PORT)
})
