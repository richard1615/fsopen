import axios from "axios"
import { useState, useEffect } from "react";

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
        .get("https://restcountries.com/v3.1/all")
        .then(response => {
          setCountries(response.data)
          console.log(response.data)
        })
  }, [])

  return (
    <div>
        <ul>
            {countries.map((c) => <li key={c.name.common}>{c.name.common}</li>)}
        </ul>
    </div>
  );
}

export default App;
