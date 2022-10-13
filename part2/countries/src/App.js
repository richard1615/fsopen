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
            })
    }, [])

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
        const newFiltered = countries.filter((c) => c.name.common.toLowerCase().includes(search.toLowerCase()))
        setFiltered(newFiltered)
        }

    const renderData = () => {
        if (filtered.length > 10) {
            return (
                <div>
                    Too many matches, specify another filter
                </div>
            )
        }
        else if (filtered.length === 1) {
            const c = filtered[0]
            const languages = Object.keys(c.languages).map((key) => [key, c.languages[key]])
            return (
                <div>
                    <h2>{c.name.common}</h2>
                    <p>capital {c.capital}</p>
                    <p>area {c.area}</p>
                    <p>Languages</p>
                    <ul>
                        {languages.map((l) => <li key={l[0]}>{l[1]}</li>)}
                    </ul>
                    <img src={c.flags.png}></img>
                </div>
            )
        }
        else {
            return (
                <ul>
                    {filtered.map((c) => <li key={c.name.common}>{c.name.common}</li>)}
                </ul>
            )
        }
    }

    return (
        <div>
            find countries <input type="text" value={search} onChange={handleSearchChange}/>
            {renderData()}
        </div>
    );
}

export default App;
