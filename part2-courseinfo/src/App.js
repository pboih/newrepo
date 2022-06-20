

const Header = (props) => {
  return (
    <>
    {console.log("Header:"+props.courses)}
      <h1>{props.courses}</h1>
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
    {x.parts.map(y => <li key={y.id}>{y.name} {y.exercises}</li>)}
    <Total parts={x.parts}/>

  </li>)}
  </>

)
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course courses={courses} /> 
}

export default App
