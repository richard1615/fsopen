import { useState } from 'react'

const Button = ({ onClick, text }) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

const Data = ({ type, count }) => {
    return (
        <p>
            {type} {count}
        </p>
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

    const calcAvg = () => {
        if (total == 0) {
            return 0
        }
        return (good - bad) / total //good * 1 + neutral * 0 + bad * -1
    }

    const calcPos = () => {
        if (total == 0) {
            return 0
        }
        return good / total
    }

    return (
        <div>
            <h1>Give Feedback</h1>
            <Button onClick={handleGood} text='good'/>
            <Button onClick={handleNeutral} text='neutral'/>
            <Button onClick={handleBad} text='bad'/>
            <h1>Statistics</h1>
            <Data type='good' count={good}/>
            <Data type='neutral' count={neutral}/>
            <Data type='bad' count={bad}/>
            <p>
                average {calcAvg()}
            </p>
            <p>
                average {calcPos()} %
            </p>
        </div>
    )
    }

export default App