const mongoose = require('mongoose')

const url = process.env.MONGO_URI

const personSchema = new mongoose.Schema({
name: {
    type: String,
    minLength: 3,
    required: [true, 'Name required']
},
number: {
    type: String,
    validate: {
        validator: (v) => /\d{3}-\d+/.test(v) || /\d{2}-\d+/.test(v),
        message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
}
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
