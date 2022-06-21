
import { useState } from 'react'


const Numbers = (props) => {
  return (
  <div>{props.name} {props.phone}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  
  

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newPhone,
      id: persons.length +1
    }
   const isFound = persons.some(element =>{ //if name is same as input return true
    if (element.name.toUpperCase() === nameObject.name.toUpperCase()){ //compare names in uppercase (case insensitive)
      return true
    }
   })
   
   isFound  //if that input already exists alarm user that it already exists
    ? alert(`${newName} is already added to the phonebook`)
    : 
      setPersons(persons.concat(nameObject)) //add new Object to array
      setNewName('')
      setNewPhone('')
  }
 
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  const filterInput = filter.toUpperCase() // TODO filter case insensitive

  const nameFilter = persons.map(person => person.name.includes(filter) ) //if each name includes input
    ? persons.filter(x => x.name.includes(filter)) //Array becomes filtered Names
    : persons //Array remains full

  
  return (
    
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={filter} onChange={handleFilterChange}/></div>


      <h2>add a new</h2>
      <form onSubmit={addPerson}>
    
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {nameFilter.map(person => 
          <Numbers key={person.name} name={person.name} phone={person.number}/>
          )}
      </ul>
    </div>
  )
}

export default App
