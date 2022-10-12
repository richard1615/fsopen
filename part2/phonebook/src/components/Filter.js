const Filter = ({ persons, setFiltered, search, setSearch }) => {
    const handleChangeSearch = (event) => {
        setSearch(event.target.value)
        const filter = persons.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
        console.log(filter)
        setFiltered(filter)
    }

    return (
        <div>
            filter shown with <input value={search} onChange={handleChangeSearch}/>
        </div>
    )
}

export default Filter