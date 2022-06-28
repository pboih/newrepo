
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
  else if(props.countries.length === 1){
  let weatherString
    if(props.weather.length != 0 ){
      weatherString = (<>
      <h2>Weather in {props.countries[0].capital}</h2>
      <p>Temperature {props.weather.main.temp} Celcius</p>
      <img src= {(`http://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`)}/>
      <p>wind {props.weather.wind.speed} m/s</p>

      </>)
    }
  
  return (
    <>
    {props.countries.map(x =>
      <div key={x.name.common}>
      <h1>{x.name.common}</h1>
      
      <p>capital {x.capital}</p>
      <p>area {x.area}</p>

      <h3>languages:</h3>
      <ul>
        {Object.values(x.languages).map( y => 
        <li key={y}>
          {y}
        </li>)}
      </ul>

      <img src={x.flags.png}/>

      {weatherString}
      </div>
      )}
      
      </>
  )}
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
  const [weather, setWeather] = useState([])
  const [listedCountries, setListedCountries] = useState([])
  const api_key = "2598af7a20b25c268ba0ffb1d45d1404"
  //Countries
  useEffect(() => {
    
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      
      setCountries(response.data)
      
    })
  }, [])
 
  const filterInput = filter.toUpperCase()
  const countriesFilter = countries.filter(x => x.name.common.toUpperCase().includes(filterInput) )
  
  //Weather
  useEffect(() => {
  if(countriesFilter.length === 1){
    
    let lat = countriesFilter[0].latlng[0]
    let lon = countriesFilter[0].latlng[1]
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    .then(response => {
      setWeather(response.data)
      console.log(response.data)
      /* props.setWeather(response.data) */
    })
  }}, [filter])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }




    return (
    
    <div>
      <Filter filterValue={filter} filterHandler={handleFilterChange}/>
      <Countries countries={countriesFilter} 
                 input={filterInput} 
                 setFilter={setFilter}
                 weather={weather}/>
    </div>
  )
}

export default App
