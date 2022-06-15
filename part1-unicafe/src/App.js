import { useState } from 'react'


const Button = ({handleClick, text}) => (
<button onClick={handleClick}>{text}</button>
)

const Statistics = ({text,state,moretext}) => (
<p>{text} {state} {moretext}</p>
  )


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
      <h1>statistics</h1>
      <Statistics text="good" state={good}/>
      <Statistics text="neutral" state={neutral}/>
      <Statistics text="bad" state={bad}/>
      <Statistics text="all" state={good+neutral+bad}/>
      <Statistics text="average" state={average/(good+neutral+bad)}/>
      <Statistics text="positive" state={((good/(good+neutral+bad))*100)} moretext="%"/>
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