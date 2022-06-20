import React from 'react'

const Header = (props) => {
    return (
      <>
      {console.log("Header:"+props.courses)}
        <h1>{props.courses}</h1><p></p>
      </>
    )
  }
  
  const Part = (props) => {
    return (
      <>
        <p>
          {props.part} {props.exercises}
        </p>
      </>
    )
  }
  
  /* const Content = (props) => {
    return (
      <div>
        <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
        <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
        <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
      </div>
    )
  }  */
  
   const Total = (props) => {
    const numbers = props.parts
    const total = numbers.reduce(function(sum, number) {
      return sum + number.exercises
    }, 0)
  
    return (
      <>
      {console.log("array:",props.parts)}
    
      <p>Number of exercises {total}</p>
      </>
    )
  } 
  
  const Course = (props) => { 
   
  
    return (
    <>
    {props.courses.map(x => 
    <li key ={x.id}>
      <Header courses = {x.name} />
      {x.parts.map(y => <p key={y.id}>{y.name} {y.exercises}</p>)}
      <Total parts={x.parts}/>
  
    </li>)}
    </>
  
  )
  }

  export default Course