import { useState } from 'react'
import Filter from './components/Filter'
import AddName from './components/AddName'
import NameList from './components/NameList'


const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [filtered, setFiltered] = useState(persons)
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                search={search}
                setSearch={setSearch}
                persons={persons}
                setFiltered={setFiltered}
            />
            <AddName
                newName={newName}
                setNewName={setNewName}
                newNumber={newNumber}
                setNewNumber={setNewNumber}
                persons={persons}
                setPersons={setPersons}
            />
            <NameList filtered={filtered}/>
        </div>
    )
}

export default App