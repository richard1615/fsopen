const NameList = ({ filtered, deletePerson }) => {
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