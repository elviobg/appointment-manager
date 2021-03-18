import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import api from '../../services/api'

const state = {
  patientUuid: ''
}

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

const createNewAppointment = (event) => {
  event.preventDefault(event)
  let observation = null
  if (typeof event.target.observation !== 'undefined') {
    observation = event.target.observation.value
  }
  createAppointment(event.target.patient.value, event.target.date.value, observation)
}

const createNewAppointmentWithPatient = (event) => {
  event.preventDefault(event)
  let observation = null
  if (typeof event.target.observation !== 'undefined') {
    observation = event.target.observation.value
  }
  createAppointment(state.patientUuid, event.target.date.value, observation)
}

const createAppointment = async (patientUuid, date, observation) => {
  console.log(patientUuid, date, observation)
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

const PatientField = ({ patients, defaultPacientUuid }) => {
  const classes = useStyles()
  const [patientID, setPatientID] = useState('')
  const handleChange = (event) => {
    setPatientID(event.target.value)
  }

  return (
    <FormControl fullWidth variant="outlined" autoComplete className={classes.formControl}>
      <InputLabel id='label-selector-patient' htmlFor="patient">Patient</InputLabel>
      <Select
        labelId='label-selector-patient'
        native
        required
        value={patientID}
        defaultValue={{ value: defaultPacientUuid }}
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
  )
}

const DateField = ({ defaultDateValue }) => {
  const classes = useStyles()

  return (
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
        defaultValue={defaultDateValue}
      />
    </FormControl>
  )
}

const ObservationField = ({ defaultObservationValue }) => {
  const classes = useStyles()

  return (
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
        rows={4}
        defaultValue={defaultObservationValue.observation}
      />
    </FormControl>
  )
}

const AppointmentForm = ({ onSubmit, fieldsContent, buttonLabel }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <form onSubmit={onSubmit} className={classes.form} validate>
        { fieldsContent }
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
    <AppointmentForm
      onSubmit={createNewAppointment}
      fieldsContent={
        <div>
          <PatientField patients={patients} defaultPacientUuid={''} />
          <DateField defaultDateValue={ new Date().toISOString().slice(0, 16) }/>
          <ObservationField defaultObservationValue={''}/>
        </div>
      }
      buttonLabel={'Create'}
    />
  )
}

export const CreateAppointmentToPatientForm = ({ preDefinedPatient }) => {
  state.patientUuid = preDefinedPatient.uuid
  return (
    <AppointmentForm
      onSubmit={createNewAppointmentWithPatient}
      fieldsContent={
        <div>
          <h2>Patient: { preDefinedPatient.name }</h2>
          <DateField defaultDateValue={ new Date().toISOString().slice(0, 16) }/>
          <ObservationField defaultObservationValue={''}/>
        </div>
      }
      buttonLabel={'Create'}
    />
  )
}

export const EditAppointmentForm = ({ selectedPacient, patients }) => {
  selectedPacient.date = selectedPacient.date.slice(0, 16)
  return (
    <AppointmentForm
      onSubmit={editAppointment}
      fieldsContent={
        <div>
          <DateField defaultDateValue={ new Date().toISOString().slice(0, 16) }/>
          <ObservationField defaultObservationValue={''}/>
        </div>
      }
      buttonLabel={'Create'}
    />
  )
}
