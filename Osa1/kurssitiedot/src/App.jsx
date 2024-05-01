import { useState } from "react"

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} exercise={props.parts[0].exercises} />
      <Part name={props.parts[1].name} exercise={props.parts[1].exercises} />
      <Part name={props.parts[2].name} exercise={props.parts[2].exercises} />
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercise}</p>
    </div>
  )
}

const Total = (props) => {
  return (
  <p>
    Number of exercises {props.parts[0].exercises + 
    props.parts[1].exercises + props.parts[2].exercises}
  </p>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        The app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      Button press history: {props.allClicks.join(" ")}
    </div>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAllClicks] = useState([])
  const [total, setTotal] = useState(0)

  const course = {
    name: 'Half Stack application development',
    parts: [ 
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const handleLeftClick = () => {
    setAllClicks(allClicks.concat("L"))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAllClicks(allClicks.concat("R"))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(left + updatedRight)
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
      <Button handleClick={handleLeftClick} text="Left"/>
      <Button handleClick={handleRightClick} text="Right"/>
      <History allClicks={allClicks}/>
      <p>Total {total}</p>
    </div>
  )
}

export default App