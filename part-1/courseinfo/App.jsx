const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.description}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part partName={props.parts[0].name} 
        exercisesCount={props.parts[0].exercises} />
      <Part partName={props.parts[1].name} 
        exercisesCount={props.parts[1].exercises} />
      <Part partName={props.parts[2].name} 
        exercisesCount={props.parts[2].exercises} />
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <p>{props.partName} {props.exercisesCount}</p>
  )
}

const Total = (props) => {
  return (
    <p>
      {
        props.parts[0].exercises 
        + props.parts[1].exercises
        + props.parts[2].exercises
      }
    </p>
  )
}
const App = () => {
  const courseInfo = {
    description: 'Half Stack application development',
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

  return (
    <div>
      <Header description={courseInfo.description} />
      <Content parts={courseInfo.parts} />
      <Total parts={courseInfo.parts} />
    </div>
  )
}

export default App