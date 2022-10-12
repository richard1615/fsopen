import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([{
        name: 'Arto Hellas',
        number: '49-73854342'
    }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    return (
        <div>
            <h2>Phonebook</h2>
            <AddName
                newName={newName}
                setNewName={setNewName}
                newNumber={newNumber}
                setNewNumber={setNewNumber}
                persons={persons}
                setPersons={setPersons}
            />
            <NameList
                persons={persons}
            />
        </div>
    )
}

const AddName = ({ newName, setNewName, persons, setPersons, newNumber, setNewNumber }) => {

    const handleChangeName = (event) => {
        setNewName(event.target.value)
    }

    const handleChangeNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSubmission = (event) => {
        event.preventDefault()
        const duplicate = persons.filter((person) => person.name === newName )
        if (duplicate.length === 0) {
            const personObject = { name: newName, number: newNumber }
            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNumber('')
        }
        else {
            setNewName('')
            setNewNumber('')
            return (
                alert(`${newName} is already added to phonebook`)
            )
        }
    }

    return (
        <>
            <form>
                <div>
                    name: <input value={newName} onChange={handleChangeName}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleChangeNumber}/>
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
                {persons.map((person) => <li key={person.name}>{person.name} {person.number}</li>)}
            </ul>
        </>
    )
}

export default App