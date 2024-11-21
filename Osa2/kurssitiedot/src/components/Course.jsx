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

export default Course