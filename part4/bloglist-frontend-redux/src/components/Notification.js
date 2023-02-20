const Notification = ({ message }) => {
  if (message === null || message === undefined) {
    return null
  }

  return <div className={`${message.type}`}>{message.text}</div>
}

export default Notification
