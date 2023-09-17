const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

// allow CORS (Corss-Origin-Resource-Sharing)
app.use(cors())

// register json parser
app.use(express.json())

// register request logger
morgan.token('req-body', function getRequestBody (req) {
  return (req.method === 'POST' || req.method === 'PUT')
    ? JSON.stringify(req.body)
    : ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

let notes =  [
  {
    "id": 1,
    "content": "HTML is easy",
    "important": false
  },
  {
    "id": 2,
    "content": "Browser can execute only JavaScript",
    "important": false
  },
  {
    "id": 3,
    "content": "GET and POST are the most important methods of HTTP protocol",
    "important": true
  },
  {
    "content": "React is very difficult",
    "important": false,
    "id": 4
  },
  {
    "content": "Java is not that hard",
    "important": true,
    "id": 5
  }
]

const generateId = () => {
  return notes.length === 0 ? 1
  : Math.max(...notes.map(n => n.id)) + 1
}

const findNoteById = (id) => {
  return notes.find(n => n.id === id)
}

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = findNoteById(id)
  if (note) {
    console.log('found', note)
    response.json(note)
  } else {
    console.log('not found')
    response.status(404).end()
  }
})

app.post('/api/notes', (request, response) => {
  // gather request data
  const reqData = request.body

  // run validations
  if (!reqData.content) {
    const respData = {
      error: 'content missing'
    }
    console.log('validation failed', respData)
    return response.status(400).json(respData)
  }

  // construct new note
  const note = {
    content: reqData.content,
    important: reqData.important || false,
    id: generateId(),
  }
 
  // add new note to the list
  console.log('creating note', note)
  notes = notes.concat(note)

  // send back newly created note
  response.json(note)
})

app.put('/api/notes/:id', (request, response) => {
  // gather request data
  const noteId = Number(request.params.id)
  const reqData = request.body

  // run validations
  if (!reqData.content) {
    const respData = {
      error: 'content missing'
    }
    console.log('validation failed', respData)
    return response.status(400).json(respData)
  }

  // find note and update
  const note = findNoteById(noteId)
  if (note) { // note exists
    const updateNote = {
      content: reqData.content,
      important: reqData.important || note.important,
      id: noteId,
    }
    // replace old note with new note on the list
    console.log('updating note', updateNote)
    notes = notes.map(n => n.id === noteId ? updateNote : n)

    // send back updated note
    response.json(updateNote)
  } else { // note does not exist
    const respData = {
      error: 'note not found. may have been removed already!'
    }
    console.log('validation failed', respData)
    return response.status(400).json(respData)
  }
})

app.delete('/api/notes/:id', (request, response) => {
  // gather request data
  const id = Number(request.params.id)

  // remove note from the list
  notes = notes.filter(note => note.id !== id)

  return response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log('server is running on port', PORT)
})
