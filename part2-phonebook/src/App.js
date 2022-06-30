
import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

//COMPONENTS
const Numbers = (props) => {
  return (
  <div>{props.name} {props.phone}</div>
  )
}

const Filter = (props) => {
  return (
  <>
  <div>
    filter shown with <input value={props.filterValue} onChange={props.filterHandler}/>
  </div>
  </>
  )
}

const Persons = (props) => {
  return (
    <>
    <ul>
          {props.nameFilter.map(person => 
          <Numbers key={person.name} name={person.name} phone={person.number}/>
          )}
    </ul>
    </>
  )
}

const PersonForm = (props) => {
  return (
    <>
    <form onSubmit={props.submitForm}>
    
    <div>
      name: <input value={props.nameValue} onChange={props.nameHandler} />
    </div>
    <div>
      number: <input value={props.phoneValue} onChange={props.phoneHandler}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

    </>
  )
}




const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
console.log(personService.getAll())
 
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
   personService
    .create(nameObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson)) //add new Object to array
      setNewName('')
      setNewPhone('')
    })
      
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

    
  const nameFilter = persons.filter(x => x.name.toUpperCase().includes(filterInput))


    return (
    
    <div>
      <h2>Phonebook</h2>
      
      <Filter filterValue={filter} filterHandler={handleFilterChange}/>
      


      <h2>Add a new</h2>
     <PersonForm submitForm={addPerson} nameValue={newName} nameHandler={handleNameChange} phoneValue={newPhone} phoneHandler={handlePhoneChange}/>
      
      <h2>Numbers</h2>
     <Persons nameFilter={nameFilter}/>
      
    </div>
  )
}

export default App
