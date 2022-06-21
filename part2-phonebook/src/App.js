
import { useState } from 'react'


const Numbers = (props) => {
  return (
  <div>{props.name} {props.phone}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas', 
      number: '040-1164487'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  
  

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newPhone
    }
   const isFound = persons.some(element =>{
    if (element.name === nameObject.name){
      return true
    }
   })
  
   isFound
    ? alert(`${newName} is already added to the phonebook`)
    : 
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewPhone('')
  }
 
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }



  return (
    
    <div>
      <h2>Phonebook</h2>
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
        {persons.map(person => 
          <Numbers key={person.name} name={person.name} phone={person.number}/>
          )}
      </ul>
    </div>
  )
}

export default App
