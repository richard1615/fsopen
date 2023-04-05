import { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR, GET_AlL_AUTHORS } from "../queries";
import Select from "react-select";

const SetBirthYear = ({ authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: GET_AlL_AUTHORS }]
  })

  const options = authors.map((a) => {
    return { value: a.name, label: a.name };
  });

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name: name.value, born } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            defaultValue={name}
            onChange={setName}
            options={options}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
}

export default SetBirthYear;