const Header = ({course}) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

const Part = ({name, exercises}) => {
  return (
    <div>
      {name} {exercises}
    </div>
  )
}

const Content = ({parts}) => {
  return (
    parts.map(part => (
      <div key={part.id}>
        <Part name={part.name} exercises={part.exercises}/>
      </div>
    ))
  )
}

const Total = ({course}) => {
  const sum = course.parts.reduce((total, part) => total + part.exercises, 0)

  return (
    <div>
      Total of {sum} exercises
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts}/>
      <Total  course={course}/>
    </div>
  )
}

const App = () => {
  const course = {
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
        exercises: 9,
        id: 4
      },
      {
        name: 'Fundamentals of debugging',
        exercises: 5,
        id: 5
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
