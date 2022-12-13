const express = require('express')
const cors = require('cors')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controller/blogs')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

const app = express()

logger.info('connecting to', config.MONGO_URI)

mongoose.connect(config.MONGO_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app