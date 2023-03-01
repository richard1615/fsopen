const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

const blogsRouter = require('./controller/blogs')
const usersRouter = require('./controller/users')
const loginRouter = require('./controller/login')
const commentRouter = require('./controller/comments')
const { errorHandler, userExtractor } = require('./utils/middleware')
const logger = require('./utils/logger')

logger.info('connecting to', config.MONGO_URI)

mongoose.connect(config.MONGO_URI)
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connection to MongoDB:', error.message)
	})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/login', loginRouter)
app.use('/api/blogs', userExtractor, blogsRouter)
app.use('/api/comments', commentRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
	const testingRouter = require('./controller/testing')
	app.use('/api/testing', testingRouter)
}

app.use(errorHandler)

module.exports = app