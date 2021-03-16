import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import api from './../../services/api'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1)
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const createNewAppointment = async (event) => {
  event.preventDefault(event)
  const date = event.target.date.value
  const patientUuid = event.target.patient.value
  let observation = null
  if (typeof event.target.observation !== 'undefined') {
    observation = event.target.observation.value
  }

  try {
    await api.post('/appointments', { date, patient_id: patientUuid, observation })
      .then((response) => {
        console.log(response)
      })
  } catch (err) {
    this.setState({ error: 'Houve um problema ao criar novo usuário' })
  }
}

const editAppointment = async (event) => {
  console.log('edit...')
}

const defaultValues = {
  date: Date.now(),
  patientId: '',
  observation: ''
}

const AppointmentForm = ({ onSubmit, patients, buttonLabel }) => {
  const classes = useStyles()
  const [patient, setPatient] = useState('')
  const handleChange = (event) => {
    setPatient(event.target.value)
  }

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
            autoFocus
            defaultValue={Date.now}
          />
        </FormControl>
        <FormControl fullWidth variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="name">Patient</InputLabel>
          <Select
            native
            required
            value={patient}
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
            defaultValue={defaultValues.observation}
          />
        </FormControl>
        <FormControl fullWidth className={classes.formControl}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
            { buttonLabel }
            </Button>
          </FormControl>
      </form>
    </div>
  )
}

export const CreateAppointmentForm = ({ patients }) => {
  return (
    <AppointmentForm onSubmit={createNewAppointment} patients={patients} buttonLabel={'Create'}/>
  )
}

export const EditAppointmentForm = ({ selectedPacient, patients }) => {
  return (
    <AppointmentForm onSubmit={editAppointment} patients={patients} buttonLabel={'Edit'}/>
  )
}
