import { useState } from 'react'

const Header = () => {
  return (
    <div>
      <h1>give feedback</h1>
    </div>
  )
}

const Statistics = ({feedback}) => {
  if (feedback.all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <table>
      <thead>
        <tr>
          <th><h1>statistics</h1></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <StatisticLine text="good" value ={feedback.good} />
        </tr>
        <tr>
          <StatisticLine text="neutral" value ={feedback.neutral} />
        </tr>
        <tr>
          <StatisticLine text="bad" value ={feedback.bad} />
        </tr>
        <tr>
          <StatisticLine text="all" value ={feedback.all} />
        </tr>
        <tr>
          <StatisticLine text="average" value ={feedback.average} />
        </tr>
        <tr>
          <StatisticLine text="positive" value ={feedback.positive} />
        </tr>
      </tbody>
    </table>
  )
}

const StatisticLine = ({text, value}) => {
  if (text === "positive"){
    return (
      <>
        <td>{text}</td>
        <td>{value} %</td>
      </>
    )
  }
  return (
    <>
    <td>{text}</td>
    <td>{value}</td>
    </>
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

const feedback = {
  good: good,
  neutral: neutral,
  bad: bad,
  all: total,
  average: average,
  positive: positive
};

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