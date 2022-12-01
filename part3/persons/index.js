const express = require('express')
const morgan = require('morgan')
const app = express()
require('dotenv').config()
const Person = require('./models/person')
const cors = require('cors')

// middlewares definition
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}


app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('content', (request, response) => JSON.stringify(request.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
        response.json(result)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
})

app.get('/info', (request, response) => {
    const num = 2
    response.send(
        `<p>Phonebook has info for ${num} people</p>` +
        `<p>${new Date()}</p>`
    )
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            next(error)
        })
})

const checkDuplicate = (name) => {
    Person.find({name: name})
        .then(result => {
            if (result.length !== 0){
                return true
            }
        })
        .catch(error => console.log(error))
    return false
}

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const person = new Person({
        "name": body.name,
        "number": body.number
    })

    // empty field
    if (!body.name || !body.number){
        response.status(400).json({ error: 'content missing' })
    }
    // name already exists
    else if (checkDuplicate(body.name)){
        // https://stackoverflow.com/questions/3825990/http-response-code-for-post-when-resource-already-exists
        response.status(409).end()
    }
    else {
        person.save()
            .then(savedNote => {
                response.json(savedNote)
            })
            .catch(error => next(error))
    }
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, {new:true})
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)