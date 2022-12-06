const mongoose = require('mongoose')

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

const mongoUrl = 'mongodb+srv://malu:L2kz7RuKxu5uKKV@cluster0.vjx3v9o.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(mongoUrl)
    .then(result => {
        console.log('Connected to MongoDB Database')
    })
    .catch(error => {
        console.log('Cannot connect to the database: ' + error.message)
    })

module.exports = mongoose.model('Blog', blogSchema)