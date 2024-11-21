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

const Course = ({course}) => {
  return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts}/>
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
