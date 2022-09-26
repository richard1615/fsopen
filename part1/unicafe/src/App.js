import { useState } from 'react'

const Button = ({ onClick, text }) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

const Statistics = ({ good, bad, neutral, total }) => {
    if (total === 0) {
        return (
            <p>
                No feedback given
            </p>
        )
    }
    const calcAvg = () => {
        if (total === 0) {
            return 0
        }
        return (good - bad) / total //good * 1 + neutral * 0 + bad * -1
    }

    const calcPos = () => {
        if (total === 0) {
            return 0
        }
        return good / total
    }
    // Further refactored
    return (
        <table>
            <tbody>
                <StatisticLine type='good' count={good}/>
                <StatisticLine type='neutral' count={neutral}/>
                <StatisticLine type='bad' count={bad}/>
                <StatisticLine type='average' count={calcAvg()}/>
                <StatisticLine type='positive' count={calcPos()}/>
            </tbody>
        </table>
    )
}

const StatisticLine = ({ type, count }) => {
    if (type === 'positive') {
        return (
            <tr>
                <td>{type}</td>
                <td>{count} %</td>
            </tr>
        )
    }
    return (
        <tr>
            <td>{type}</td>
            <td>{count}</td>
        </tr>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(0)

    const handleGood = () => {
        setGood(good + 1)
        setTotal(total + 1)
    }

    const handleBad = () => {
        setBad(bad + 1)
        setTotal(total + 1)
    }

    const handleNeutral = () => {
        setNeutral(neutral + 1)
        setTotal(total + 1)
    }

    return (
        <div>
            <h1>Give Feedback</h1>
            <Button onClick={handleGood} text='good'/>
            <Button onClick={handleNeutral} text='neutral'/>
            <Button onClick={handleBad} text='bad'/>
            <h1>Statistics</h1>
            <Statistics good={good} bad={bad} neutral={neutral} total={total}/>
        </div>
    )
    }

export default App