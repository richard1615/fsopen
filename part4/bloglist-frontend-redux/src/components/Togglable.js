import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Switch } from '@mui/material'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Switch
          checked={visible}
          onChange={toggleVisibility}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        {props.buttonLabel}
      </div>
      <div style={showWhenVisible}>
        <Switch
          checked={visible}
          onChange={toggleVisibility}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        cancel
        {props.children}
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
