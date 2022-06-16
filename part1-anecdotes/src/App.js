import { useState } from 'react'

const Button = ({handleClick,text}) => {
  return <button onClick={handleClick}>{text}</button>
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0))
  const [mostvotes, setMostvotes] = useState('')

  const randomQuote = () => {
    const randomized = setSelected(Math.floor(Math.random()*anecdotes.length))
    return (
      randomized
      )
  }

  const submitVote = () => {
    const tempArray = [...vote]
    tempArray[selected] +=1
    setVote(tempArray)
    updateVotes(tempArray)
    console.log(tempArray)
   
  }
  
  const updateVotes = (p) => {
    const largestNr = Math.max.apply( Math, p )
    setMostvotes(p.indexOf(largestNr))
  }
  
  return (
    <div>
      {anecdotes[selected]}
      <p>has {vote[selected]} votes</p>
      <Button handleClick={submitVote} text="vote"/> 
      <Button handleClick={randomQuote} text="next anecdote"/>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[mostvotes]}</p>

      </div>
    </div>
  )
}

export default App