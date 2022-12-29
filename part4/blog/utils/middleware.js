const logger = require('./logger')

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

const tokenExtractor = (request, response, next) => {
    console.log('inside middleware')
    const auth = request.get('authorisation')
    console.log(auth)
    if(auth && auth.toLowerCase().startsWith('bearer')){
        request.token = auth.substring(7)
    }
    else{
        request.token = null
    }
    next()
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor
}