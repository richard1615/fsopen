import { useState, useEffect } from 'react'
import axios from 'axios'
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
        console.log("effect")
        axios
            .get("http://localhost:3001/persons")
            .then((response) => {
                console.log(response)
                setPersons(response.data)
                setFiltered(persons)
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