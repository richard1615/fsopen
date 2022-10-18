import personService from "../services/personService";

const NameList = ({ filtered, persons, setMessage, setPersons, setFiltered }) => {

    const deletePerson = (event) => {
        const id = Number(event.target.value)
        const person = persons.find((p) => {
            return id === p.id})
        if (window.confirm(`Delete ${person.name}?`)) {
            personService
                .deleteObject(id)
                .then(() => {
                    const newPersons = persons.filter((p) => p.id !== id)
                    setPersons(newPersons)
                    setFiltered(newPersons)
                })
                .catch(() => {
                    return(
                        alert(`Information of ${person.name} has already been removed from the server`)
                    )
                })
        }
    }

    return (
        <>
            <h2>Numbers</h2>
            <ul>
                {filtered.map((person) => <li
                    key={person.id}>{person.name} {person.number}
                    <button value={person.id} onClick={deletePerson}>Delete</button>
                </li>)}
            </ul>
        </>
    )
}

export default NameList