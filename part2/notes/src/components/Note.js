const Note = ({ note, toggleImportance }) => {
    const importance = note.important?"Important":"Not important"
    return (
      <div>
          <li>{note.content}: {importance}</li>
          <button onClick={toggleImportance}>Change Importance</button>
      </div>
    )
}

export default Note