
import { useState, useEffect } from 'react'
import axios from 'axios'


const Countries = (props) => {
  const countryId = props.countries.map(country => country.ccn3)

  // EventHandler Function,
  // work with closure

  const prepareClickHandler = (countryName) => {
    return (  () => {
      props.setFilter(countryName)
    })
  }
  
  
  if(props.countries.length > 10 && props.input != '' ) return (
    <p>Too many matches, specify another filter. </p>
  
  )
  else if(props.countries.length === 1) return (
    props.countries.map(x =>
      <>
      <h1>{x.name.common}</h1>
      
      <p>capital {x.capital}</p>
      <p>area {x.area}</p>

      <h3>languages:</h3>
      <ul>
        {Object.values(x.languages).map( y => 
        <li>
          {y}
        </li>)}
      </ul>

      <img src={x.flags.png}/>
      </>
      )
  )
  else return (<ul>
  {
     props.countries.map(x =>
       <li key={x.ccn3}>{x.name.common}<button id={x.name.common} onClick={prepareClickHandler(x.name.common)} >show</button></li>
             )
   }
   </ul>)
}

const Filter = (props) => {
  return (
  <>
  <div>
    find countries <input value={props.filterValue} onChange={props.filterHandler}/>
  </div>
  </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('') 
  
  
  useEffect(() => {
    console.log('effect')
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
      console.log(response.data)
    })
  }, [])
  console.log('render', countries.length, 'countries')
  console.log(countries)
  


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filterInput = filter.toUpperCase()
  const countriesFilter = countries.filter(x => x.name.common.toUpperCase().includes(filterInput) )
 

    return (
    
    <div>
      <Filter filterValue={filter} filterHandler={handleFilterChange}/>
      <Countries countries={countriesFilter} input={filterInput} setFilter={setFilter}/>
    </div>
  )
}

export default App
