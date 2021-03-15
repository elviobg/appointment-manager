import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1)
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export const AppointmentForm = ({ onSubmit, patients }) => {
  const classes = useStyles()
  const [gender, setGender] = useState('')
  const handleChange = (event) => {
    setGender(event.target.value)
  }
  console.log(patients)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <form onSubmit={onSubmit} className={classes.form}>
        <FormControl fullWidth className={classes.formControl}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="date"
            label="date"
            name="date"
            autoComplete="date"
            type="datetime-local"
            defaultValue="2020-01-01T10:30Z"
            autoFocus
          />
        </FormControl>
        <FormControl fullWidth variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="name">Patient</InputLabel>
          <Select
            native
            required
            value={gender}
            onChange={handleChange}
            inputProps={{
              name: 'patient',
              id: 'patient'
            }}
          >
            {(patients || []).map((patient) => {
              return <option key={patient.uuid} value={patient.uuid}>{patient.name}</option>
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth className={classes.formControl}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="observation"
            label="observation"
            name="observation"
            autoFocus
            multiline
            rows={5}
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Create
        </Button>
      </form>
    </div>
  )
}

export default AppointmentForm
