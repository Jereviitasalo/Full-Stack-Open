import { useState } from 'react'

const Header = () => {
  return (
    <div>
      <h1>give feedback</h1>
    </div>
  )
}

const Statistics = ({feedback}) => {
  if (feedback[3] !== 0)
    return (
      <div>
        <h1>statistics</h1>
        <p>good {feedback[0]}</p>
        <p>neutral {feedback[1]}</p>
        <p>bad {feedback[2]}</p>
        <p>all {feedback[3]}</p>
        <p>average {feedback[4]}</p>
        <p>positive {feedback[5]} %</p>
      </div>
    )
  return (
    <div>
      <p>No feedback given</p>
    </div>
  )
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

const  feedback = [good, neutral, bad, total, average, positive]


const  addGood = () => {
  const updatedGood = good + 1
  const updatedTotal = total + 1
  setGood(good + 1)
  setTotal(total + 1)
  setAverage((updatedGood - bad) / updatedTotal)
  setPositive((updatedGood / updatedTotal) * 100)
}

const  addNeutral = () => {
  const updatedTotal = total + 1
  setNeutral(neutral + 1)
  setTotal(total + 1)
  setAverage((good - bad) / updatedTotal)
  setPositive((good / updatedTotal) * 100)
}

const  addBad = () => {
  const updatedBad = bad + 1
  const updatedTotal = total + 1
  setBad(bad + 1)
  setTotal(total + 1)
  setAverage((good - updatedBad) / updatedTotal)
  setPositive((good / updatedTotal) * 100)
}

  return (
    <div>
      <Header />
      <Button handleClick={addGood} text="good"/>
      <Button handleClick={addNeutral} text="neutral"/>
      <Button handleClick={addBad} text="bad"/>
      <Statistics feedback={feedback}/>
    </div>
  )
}

export default App