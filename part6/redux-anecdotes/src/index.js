import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from 'react-redux'
import App from './App'
import AnecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from "./reducers/FilterReducer"
import NotificationReducer from "./reducers/notificationReducer"

const store = configureStore({
  reducer: {
    anecdotes: AnecdoteReducer,
    filter: filterReducer,
    notification: NotificationReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

