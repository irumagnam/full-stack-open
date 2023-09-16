const Total = ({ parts }) => {
  return (
    <p>
      <b>total of {
        parts.map(partInfo => partInfo.exercises)
            .reduce((a,b) => a+b, 0)
      } exercises</b>
    </p>
  )
}

export default Total