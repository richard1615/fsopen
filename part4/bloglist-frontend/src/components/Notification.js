import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notifications)
  console.log('message', message)
  if (message === null) {
    return null
  }
  return <div className={`${message.type}`}>{message.text}</div>
}

export default Notification
