import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const handleChange = (event) => {
        setNewName(event.target.value)
    }

    const handleSubmission = (event) => {
        event.preventDefault()
        const nameObject = { name: newName }
        setPersons(persons.concat(nameObject))
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name: <input onChange={handleChange}/>
                </div>
                <div>
                    <button type="submit" onClick={handleSubmission}>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map((person) => <li key={person.name}>{person.name}</li>)}
            </ul>
        </div>
    )
}

export default App