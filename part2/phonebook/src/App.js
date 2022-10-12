import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    return (
        <div>
            <h2>Phonebook</h2>
            <AddName
                newName={newName}
                setNewName={setNewName}
                persons={persons}
                setPersons={setPersons}
            />
            <NameList
                persons={persons}
            />
        </div>
    )
}

const AddName = ({ newName, setNewName, persons, setPersons }) => {

    const handleChange = (event) => {
        setNewName(event.target.value)
    }

    const handleSubmission = (event) => {
        event.preventDefault()
        const duplicate = persons.filter((person) => person.name === newName )
        if (duplicate.length === 0) {
            const nameObject = { name: newName }
            setPersons(persons.concat(nameObject))
            setNewName('')
        }
        else {
            setNewName('')
            return (
                alert(`${newName} is already added to phonebook`)
            )
        }
    }

    return (
        <>
            <form>
                <div>
                    name: <input value={newName} onChange={handleChange}/>
                </div>
                <div>
                    <button type="submit" onClick={handleSubmission}>add</button>
                </div>
            </form>
        </>
    )
}

const NameList = ({ persons }) => {
    return (
        <>
            <h2>Numbers</h2>
            <ul>
                {persons.map((person) => <li key={person.name}>{person.name}</li>)}
            </ul>
        </>
    )
}

export default App