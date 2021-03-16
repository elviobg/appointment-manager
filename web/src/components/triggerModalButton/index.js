import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const buttonStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const Trigger = ({ triggerText, buttonRef, showModal }) => {
  const classes = buttonStyles()
  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
      ref={buttonRef}
      onClick={showModal}
    >
      {triggerText}
    </Button>
  )
}
export default Trigger
