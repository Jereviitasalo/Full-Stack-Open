const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.courseData[0].part} exercise={props.courseData[0].exercises} />
      <Part part={props.courseData[1].part} exercise={props.courseData[1].exercises} />
      <Part part={props.courseData[2].part} exercise={props.courseData[2].exercises} />
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercise}</p>
    </div>
  )
}

const Total = (props) => {
  return (
  <p>
    Number of exercises {props.courseData[0].exercises + 
    props.courseData[1].exercises + props.courseData[2].exercises}
  </p>
  )
}

const App = () => {
  const course = 'Half Stack application development';
  const courseData = [
    {"part": 'Fundamentals of React', "exercises": 10},
    {"part": 'Using props to pass data', "exercises": 7},
    {"part": 'State of a component', "exercises": 14}
  ];

  return (
    <div>
      <Header course={course} />
      <Content courseData={courseData}/>
      <Total courseData={courseData}/>
    </div>
  )
}

export default App