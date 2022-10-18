import personService from "../services/personService";
import {useState} from "react";


const AddName = ({ persons, setPersons, setFiltered, setMessage }) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleChangeName = (event) => {
        setNewName(event.target.value)
    }

    const handleChangeNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const message = (text) => {
        setMessage({
            text: text,
            type: 'success'
        })
    }

    const handleSubmission = (event) => {
        event.preventDefault()
        const duplicate = persons.find((person) => person.name === newName )
        if (!duplicate) {
            const personObject = { name: newName, number: newNumber }
            personService
                .create(personObject)
                .then(createdData => {
                    setPersons(persons.concat(createdData))
                    setNewName('')
                    setNewNumber('')
                    message(`Added ${createdData.name}`)
                })
        }
        else {
            setNewName('')
            setNewNumber('')
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const person = duplicate
                const newPerson = {...person, number:newNumber}
                personService
                    .editObject(newPerson)
                    .then(editedPerson => {
                        const newPersons = persons.map(p => p.name !== person.name?p:editedPerson)
                        setPersons(newPersons)
                        setFiltered(newPersons)
                    })
                    .catch(() => {
                        return(
                            setMessage({
                                text: `Information of ${person.name} has already been removed from the server`,
                                type: "error"
                            })
                        )
                    })
            }
        }
    }


    return (
        <>
            <h3>add a new</h3>
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

export default AddName