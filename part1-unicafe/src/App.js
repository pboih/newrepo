import { useState } from 'react'


const Button = ({handleClick, text}) => (
<button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({text,state,moretext}) => (
<p>{text} {state} {moretext}</p>
  )

const Statistics = (props) => {
  return(
  <div>
    <h1>statistics</h1>
      <StatisticLine text="good" state={props.good}/>
      <StatisticLine text="neutral" state={props.neutral}/>
      <StatisticLine text="bad" state={props.bad}/>
      <StatisticLine text="all" state={props.all}/>
      <StatisticLine text="average" state={props.average}/>
      <StatisticLine text="positive" state={props.positive} moretext="%"/>
  </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const [average, setAverage] = useState(0)


  const handleGood = () => {
    setGood(good + 1)
    setAverage(average + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAverage(average + 0)
  }

  const handleBad = () => {
    setBad(bad + 1)
    setAverage(average - 1)
  }
  

  if((good+neutral+bad)>=1) {

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="good"/>
      <Button handleClick={handleNeutral} text="neutral"/>
      <Button handleClick={handleBad} text="bad"/>

      <Statistics good={good} neutral={neutral} bad={bad} all={good+neutral+bad} average={(average/(good+neutral+bad))} positive={((good/(good+neutral+bad))*100)} />
      
    </div>
    )
  }
  else return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="good"/>
      <Button handleClick={handleNeutral} text="neutral"/>
      <Button handleClick={handleBad} text="bad"/>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </div>
  )
}

export default App