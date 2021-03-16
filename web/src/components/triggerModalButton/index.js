import React from 'react'
import Button from '@material-ui/core/Button'

const Trigger = ({ triggerButtonText, buttonRef, showModal }) => {
  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      ref={buttonRef}
      onClick={showModal}
    >
      {triggerButtonText}
    </Button>
  )
}
export default Trigger
