
import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'



//COMPONENTS
const Notification = ({message}) => {
  if (message === null) {
    return null
  }
else
  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const Error = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
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
  const [successfulOperation, setSuccessfulOperation] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  
 

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

 
  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newPhone,
      id: persons[persons.length-1].id + 1 // in delete funktion mit setCounter auf +1 updaten
    }
   const isFound = persons.some(element =>{ //if name is same as input return true
    if (element.name.toUpperCase() === nameObject.name.toUpperCase()){ //compare names in uppercase (case insensitive)
      return true
    }
   })
   if(isFound){  //if that input already exists alarm user that it already exists
    
    //TODO FIX THIS
    if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
      const singlePerson = persons.find(element => {
        if(element.name.toUpperCase()===nameObject.name.toUpperCase() ) {
      return element.id }})
      const personID = singlePerson.id
      
//TODO FIX THIS
      personService
        .update(personID, nameObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== personID ? person : returnedPerson))
          
          setSuccessfulOperation(`Updated ${returnedPerson.name}`)
          setTimeout(() => {
            setSuccessfulOperation(null)
          }, 5000)
        })
        .catch(error => {console.log(error)})
     }
    }
   else 
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson)) //add new Object to array
          setNewName('')
          setNewPhone('')
          
          setSuccessfulOperation(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setSuccessfulOperation(null)
          }, 5000)
        })
        .catch(error => {
          console.log('Create Failed')
        })
      
  }

  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)){
    personService
    .remove(id)
    .then( response => {
      personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
          })
          .catch(error => {
            console.log('Remove failed')
          })
      })
    }
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
  console.log("persons:",persons)


    return (
    
    <div>
      <h2>Phonebook</h2>
      <Notification message={successfulOperation}/>
      <Error message={errorMessage} />

      <Filter filterValue={filter} filterHandler={handleFilterChange}/>
      


      <h2>Add a new</h2>
     <PersonForm submitForm={addPerson} nameValue={newName} nameHandler={handleNameChange} phoneValue={newPhone} phoneHandler={handlePhoneChange}/>
      
      <h2>Numbers</h2>
      <ul>
          {nameFilter.map(person => 
          <div key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person.id, person.name)}>delete</button></div>
          )}
    </ul>
      
    </div>
  )
}

export default App
