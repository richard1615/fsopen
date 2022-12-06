const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/blog')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controller/notes')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const PORT = config.PORT
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})