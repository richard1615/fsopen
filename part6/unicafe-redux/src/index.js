import React from "react"
import ReactDOM from "react-dom"
import { createStore } from "redux"
import counterReducer from "./reducer"

const store = createStore(counterReducer)

const App = () => {
  const { good, ok, bad } = store.getState()
  return (
    <div>
      good: {good} <button onClick={() => store.dispatch({ type: "GOOD" })}>good</button>
      ok: {ok} <button onClick={() => store.dispatch({ type: "OK" })}>ok</button>
      bad: {bad} <button onClick={() => store.dispatch({ type: "BAD" })}>bad</button>
      <button onClick={() => store.dispatch({ type: "ZERO" })}>reset</button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)