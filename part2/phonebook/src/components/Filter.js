import {useState} from "react";

const Filter = ({ persons, setFiltered }) => {
    const [search, setSearch] = useState('')
    const handleChangeSearch = (event) => {
        setSearch(event.target.value)
        if (search === '') {
            setFiltered(persons.slice())
        }
        else {
            const filter = persons.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
            setFiltered(filter)
        }
    }

    return (
        <div>
            filter shown with <input value={search} onChange={handleChangeSearch}/>
        </div>
    )
}

export default Filter