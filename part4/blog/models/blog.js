const mongoose = require('mongoose')
const config = require('../utils/config.js')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const mongoUrl = config.MONGO_URI

mongoose.connect(mongoUrl)
    .then(result => {
        console.log('Connected to MongoDB Database')
    })
    .catch(error => {
        console.log('Cannot connect to the database: ' + error.message)
    })

module.exports = mongoose.model('Blog', blogSchema)