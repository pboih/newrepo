

const Header = (props) => {
  return (
    <>
    {console.log("Header:"+props.course)}
      <h1>{props.course}</h1>
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
 
  {console.log("Course:",props.course.parts[1].name)}
  return (
  <>
  <Header course = {props.course.name} />
 
  {props.course.parts.map(x => <li key={x.id}>{x.name} {x.exercises}</li>)}
  
  <Total parts={props.course.parts}/>
    
  
  </>

)
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return <Course course={course} />
}

export default App
