const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
} else {
    const password = process.argv[2]
    const url = `mongodb+srv://malu:${password}@cluster0.vjx3v9o.mongodb.net/Phonebook?retryWrites=true&w=majority`

    const personSchema = new mongoose.Schema({
        name: String,
        number: String
    })

    const Person = mongoose.model('Person', personSchema)

    if (process.argv.length === 5) {
        const newName = process.argv[3]
        const newNumber = process.argv[4]

        mongoose
            .connect(url)
            .then(result => {
                const person = new Person({
                    name: newName,
                    number: newNumber
                })
                return person.save()
            })
            .then(() => {
                console.log(`added ${newName} number: ${newNumber} to phonebook`)
                return mongoose.connection.close()
            })
            .catch(err => console.log(err))

    } else if (process.argv.length === 3) {
        mongoose
            .connect(url)
            .then(result => {
                Person.find({}).then(result => {
                    console.log('phonebook:')
                    result.forEach(person => {
                        console.log(`${person.name} ${person.number}`)
                    })
                    mongoose.connection.close()
                })
            })
            .catch(err => console.log(err))
    } else {
        console.log('Please enter the parameters correctly: \n' + 'node mongo.js <password> <name> <phone-no> or \n' +
            'node mongo.js <password> ')
        process.exit(1)
    }
}