import { createSlice } from "@reduxjs/toolkit"

const notificationReducer = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  }
})

export const selectNotification = (content, time) => {
  return async dispatch => {
    dispatch(setNotification(content))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, time * 1000)
  }
}

export const { setNotification } = notificationReducer.actions
export default notificationReducer.reducer