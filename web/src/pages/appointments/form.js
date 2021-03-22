import React, { useState } from 'react'
import { Alert } from 'react-st-modal'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import api from '../../services/api'
import MESSAGES from '../../services/messages'

const state = {
  patientUuid: '',
  appointments: []
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

const PatientField = ({ patients, defaultPacientUuid }) => {
  const classes = useStyles()
  const [patientID, setPatientID] = useState('')
  const handleChange = (event) => {
    setPatientID(event.target.value)
  }

  return (
    <FormControl fullWidth variant="outlined" autoComplete className={classes.formControl}>
      <InputLabel id='label-selector-patient' htmlFor="patient">{MESSAGES.LABEL.PATIENT}</InputLabel>
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
        label={MESSAGES.LABEL.DATE}
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
        label={MESSAGES.LABEL.OBSERVATION}
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

export const CreateAppointmentForm = ({ patients, onSubmit }) => {
  return (
    <AppointmentForm
      onSubmit={onSubmit}
      fieldsContent={
        <div>
          <PatientField patients={patients} defaultPacientUuid={''} />
          <DateField defaultDateValue={ new Date().toISOString().slice(0, 16) }/>
          <ObservationField defaultObservationValue={''}/>
        </div>
      }
      buttonLabel={MESSAGES.BUTTONS.CREATE}
    />
  )
}

export const CreateAppointmentToPatientForm = ({ preDefinedPatient, onSubmit }) => {
  state.patientUuid = preDefinedPatient.uuid
  return (
    <AppointmentForm
      onSubmit={onSubmit}
      fieldsContent={
        <div>
          <h2>{MESSAGES.LABEL.PATIENT}: { preDefinedPatient.name }</h2>
          <DateField defaultDateValue={ new Date().toISOString().slice(0, 16) }/>
          <ObservationField defaultObservationValue={''}/>
        </div>
      }
      buttonLabel={MESSAGES.BUTTONS.CREATE}
    />
  )
}

export const EditAppointmentForm = ({ preDefinedPatient, appointments, onSubmit }) => {
  const classes = useStyles()
  const [observation, setObservation] = useState(appointments[0].observation)
  const [date, setDate] = useState('')
  const handleChangeDate = (event) => {
    setDate(event.target.value)
    const filtered = appointments.filter(function (current, index, arr) {
      return current.uuid == event.target.value
    })
    setObservation(filtered[0].observation)
  }

  const handleChangeObservation = (event) => {
    setObservation(event.target.value)
  }

  if (appointments.length > 0) {
    return (
      <AppointmentForm
        onSubmit={onSubmit}
        fieldsContent={
          <div>
            <h2>{MESSAGES.LABEL.PATIENT}: { preDefinedPatient.name }</h2>
            <FormControl fullWidth variant="outlined" autoComplete className={classes.formControl}>
              <InputLabel id='label-selector-date' htmlFor="date">{MESSAGES.LABEL.DATE}</InputLabel>
              <Select
                labelId='label-selector-date'
                native
                required
                value={date}
                onChange={handleChangeDate}
                inputProps={{
                  name: 'date',
                  id: 'date'
                }}
              >
                {(appointments || []).map((appointment) => {
                  return <option key={appointment.date} value={appointment.uuid}>{appointment.date}</option>
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="observation"
                onChange={handleChangeObservation}
                value={observation}
                label={MESSAGES.LABEL.OBSERVATION}
                name="observation"
                autoFocus
                multiline
                rows={4}
              />
            </FormControl>
          </div>
        }
        buttonLabel={MESSAGES.BUTTONS.EDIT}
      />
    )
  } else {
    return (
      <div>
        Nenhuma consulta agendada
      </div>
    )
  }
}
