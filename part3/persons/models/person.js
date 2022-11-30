const mongoose = require('mongoose')

const url = process.env.MONGO_URI

const personSchema = new mongoose.Schema({
name: String,
number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

mongoose.connect(url)
    .then(result => {
        console.log('Connected to MongoDB database')
    })
    .catch(err => {
        console.log('Error connecting to MongoDB: ' + err.message)
    })


module.exports = mongoose.model('Person', personSchema)
