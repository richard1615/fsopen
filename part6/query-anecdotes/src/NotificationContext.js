import { createContext, useReducer, useContext } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'VOTE':
      return `anecdote '${action.payload}' voted`
    case 'ERROR':
      return 'too short anecdote, must have length 5 or more'
    case 'NULL':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext(undefined)

export const NotificationContextProvider = (props) => {
  const [ notif, notifDispatch ] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notif, notifDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notifDispatch = useContext(NotificationContext)
  return notifDispatch[0]
}

export const useNotificationDispatch = () => {
  const notifDispatch = useContext(NotificationContext)
  return notifDispatch[1]
}

export default NotificationContext