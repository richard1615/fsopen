import personService from "../services/personService";


const AddName = ({ newName, setNewName, persons, setPersons, newNumber, setNewNumber, setFiltered }) => {

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
            personService
                .create(personObject)
                .then(createdData => {
                    setPersons(persons.concat(createdData))
                    setNewName('')
                    setNewNumber('')
                })
        }
        else {
            setNewName('')
            setNewNumber('')
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const person = duplicate[0]
                const newPerson = {...person, number:newNumber}
                personService
                    .editObject(newPerson)
                    .then(editedPerson => {
                        const newPersons = persons.map(p => p.name !== person.name?p:editedPerson)
                        setPersons(newPersons)
                        setFiltered(newPersons)
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