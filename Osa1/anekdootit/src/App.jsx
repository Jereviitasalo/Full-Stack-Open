import { useState, useSyncExternalStore } from 'react'

const AnecdoteOfTheDay = ({anecdote, vote}) => {
  if (anecdote === 0) {
    return (
      null
    )
  }
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdote}</p>
      <p>has {vote} votes</p>
    </>
  )
}

const AnecdoteWithMostVotes = ({mostVotedAnecdote}) => {
  return(
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{mostVotedAnecdote}</p>
    </div>
  )
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [ selected, setSelected ] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const setAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const vote = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    const mostVotes = copyVotes.indexOf(Math.max(...copyVotes)) // Gets index of most voted anecdote
    setVotes(copyVotes)
    setMostVoted(mostVotes)
  }

  return (
    <div>
      <AnecdoteOfTheDay anecdote={anecdotes[selected]} vote={votes[selected]}/>
      <Button handleClick={vote} text={"vote"}/>
      <Button handleClick={setAnecdote} text={"next anecdote"}/>
      <AnecdoteWithMostVotes mostVotedAnecdote={anecdotes[mostVoted]}/>
    </div>
  )
}

export default App
