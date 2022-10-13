import axios from "axios"
import {useState, useEffect} from "react";

function App() {
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then(response => {
                setCountries(response.data)
                console.log(response.data)
            })
    }, [])

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
        const newFiltered = countries.filter((c) => c.name.common.toLowerCase().includes(search.toLowerCase()))
        setFiltered(newFiltered)
    }

    return (
        <div>
            find countries <input type="text" value={search} onChange={handleSearchChange}/>
            <ul>
                {filtered.map((c) => <li key={c.name.common}>{c.name.common}</li>)}
            </ul>
        </div>
    );
}

export default App;
