import { useState } from 'react'

const Header = ({ description }) => (
  <h1>{description}</h1>
)

const Button = ( {handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad }) => {
  const totalFeedbacks = good + neutral + bad
  
  if (totalFeedbacks === 0) {
    return <div>No feedback given</div>
  }

  const avgScore = ((good * 1) + (bad * -1)) / totalFeedbacks
  const percentPosFeedback = (good / totalFeedbacks) * 100

  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={totalFeedbacks} />
        <StatisticsLine text="average" value={avgScore} />
        <StatisticsLine text="positive" value={percentPosFeedback + ' %'} />
      </tbody>
    </table>
  )
}

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header description='give feedback' />
      <Button text='good' handleClick={() => setGood(good + 1)} />
      <Button text='neutral' handleClick={() => setNeutral(neutral + 1)} />
      <Button text='bad' handleClick={() => setBad(bad + 1)} />
      <Header description='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App