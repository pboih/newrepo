
import { useState } from 'react'


const Numbers = (props) => {
  return (
  <div>{props.name}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
  }
  console.log(persons)
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
    
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <Numbers key={person.name} name = {person.name}/>
          )}
      </ul>
    </div>
  )
}

export default App
