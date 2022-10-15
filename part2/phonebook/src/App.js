import { useState, useEffect } from 'react'
import personService from "./services/personService";
import Filter from './components/Filter'
import AddName from './components/AddName'
import NameList from './components/NameList'


const App = () => {
    const [persons, setPersons] = useState([])
    const [filtered, setFiltered] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() => {
            personService
                .getAll()
                .then(initialData => {
                    setPersons(initialData)
                })
    }, [])

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