const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/blog')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controller/notes')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = config.PORT
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})