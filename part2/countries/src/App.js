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

    return (
        <div>
            <Search
                search={search}
                setSearch={setSearch}
                countries={countries}
                setFiltered={setFiltered}
            />
            <Results
                filtered={filtered}
            />
        </div>
    );
}

const Search = ({ setSearch, countries, setFiltered, search }) => {

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
        const newFiltered = countries.filter((c) => c.name.common.toLowerCase().includes(search.toLowerCase()))
        setFiltered(newFiltered)
    }

    return (
        <>
            find countries <input type="text" value={search} onChange={handleSearchChange}/>
        </>
    )
}

const Results = ({ filtered }) => {
    const [show, setShow] = useState(false)
    const [newCountry, setNewCountry] = useState([])

    const showCountry = (event) => {
        const c = filtered.find((country) => country.name.common === event.target.value)
        if (newCountry === c) {
            setShow(!show)
        }
        else {
            setNewCountry(c)
        }
    }

    if (filtered.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    else if (filtered.length === 1) {
        return (
            <DetailCountry c={filtered[0]} flag={true}/>
        )
    }
    else {
        return (
            <>
                <ul>
                    {filtered.map((c) => <li key={c.name.common}>
                        {c.name.common} <button value={c.name.common} onClick={showCountry}>Show</button>
                    </li>)}
                </ul>
                <DetailCountry c={newCountry} flag={show}/>
            </>
        )
    }
}

const DetailCountry = ({ c, flag }) => {
    if (flag) {
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
                <img src={c.flags.png} alt="Flag of Country"></img>
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}

export default App;
