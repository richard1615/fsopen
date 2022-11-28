const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('content', (request, response) => JSON.stringify(request.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

const MAX = 10000000

let persons = [
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

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find((p) => p.id === id )

    if (person){
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    const num = persons.length
    response.send(
        `<p>Phonebook has info for ${num} people</p>` +
        `<p>${new Date()}</p>`
    )
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter((p) => p.id !== id)
    response.status(204).end()
})

const checkDuplicate = (name) => {
    return persons.find((p) => p.name === name)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    const newId = Math.floor(Math.random() * MAX)

    const person = {
        "id": newId,
        "name": body.name,
        "number": body.number
    }
    // empty field
    if (!body.name || !body.number){
        response.status(400).json({ error: 'content missing' })
    }
    // name already exists
    else if (checkDuplicate(person.name)){
        // refer https://stackoverflow.com/a/3826024
        response.status(409).json({error: 'name must be unique' })
    }
    else {
        persons = persons.concat(person)
        response.json(person)
    }
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)