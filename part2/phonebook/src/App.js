import { useState, useEffect } from 'react'
import personService from "./services/personService";
import Filter from './components/Filter'
import AddName from './components/AddName'
import NameList from './components/NameList'
import Notification from './components/Notification'


const App = () => {
    const [persons, setPersons] = useState([])
    const [filtered, setFiltered] = useState([...persons])
    const [message, setMessage] = useState({
        text: '',
        type: ''
    })

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
            <Notification
                message={message.text}
                type={message.type}
            />
            <Filter
                persons={persons}
                setFiltered={setFiltered}
            />
            <AddName
                persons={persons}
                setPersons={setPersons}
                setFiltered={setFiltered}
                setMessage={setMessage}
            />
            <NameList
                filtered={filtered}
                persons={persons}
                setMessage={setMessage}
                setPersons={setPersons}
                setFiltered={setFiltered}
            />
        </div>
    )
}

export default App