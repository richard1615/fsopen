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
            const personObject = { name: newName, number: newNumber, id: persons.length+1 }
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