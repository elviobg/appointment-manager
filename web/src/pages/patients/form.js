import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'

import api from './../../services/api'
import MESSAGES from './../../services/messages'

const state = {
  error: null
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const createNewPatient = async (event) => {
  event.preventDefault(event)
  const name = event.target.name.value
  const phone = event.target.phone.value
  const birthday = event.target.birthday.value
  const gender = event.target.gender.value
  const height = event.target.height.value
  const weight = event.target.weight.value
  try {
    await api.post('/patients', { name, phone, birthday, gender, height, weight })
      .then((response) => {
        console.log(response)
      })
  } catch (err) {
    this.setState({ error: MESSAGES.ERROR.DB_CONNECTION })
  }
}

const updatePatient = async (event) => {
  event.preventDefault(event)
  const name = event.target.name.value
  const phone = event.target.phone.value
  const birthday = event.target.birthday.value
  const gender = event.target.gender.value
  const height = event.target.height.value
  const weight = event.target.weight.value
  try {
    await api.put('/patients/'.concat(uuid), { name, phone, birthday, gender, height, weight })
      .then((response) => {
        console.log(response)
      })
  } catch (err) {
    this.setState({ error: MESSAGES.ERROR.DB_CONNECTION })
  }
}

let uuid

export const PatientForm = ({ onSubmit, defaultPacientValues }) => {
  const classes = useStyles()
  const [gender, setGender] = useState(defaultPacientValues.gender)
  const handleChange = (event) => {
    setGender(event.target.value)
  }
  console.log(defaultPacientValues)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <form onSubmit={onSubmit} className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label={MESSAGES.LABEL.FIRSTNAME}
          name="name"
          autoComplete="name"
          autoFocus
          defaultValue={defaultPacientValues.name}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="phone"
          label={MESSAGES.LABEL.PHONE}
          name="phone"
          autoComplete="phone"
          autoFocus
          defaultValue={defaultPacientValues.phone}
        />
        <FormControl
          fullWidth
          variant="outlined"
          className={classes.formControl}
          >
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="birthday"
            label={MESSAGES.LABEL.BIRTHDAY}
            name="birthday"
            autoComplete="birthday"
            type="date"
            autoFocus
            defaultValue={defaultPacientValues.birthday}
          />
          <FormControl
            variant="outlined"
            className={classes.formControl}
            >
            <InputLabel required htmlFor="gender">{MESSAGES.LABEL.GENDER}</InputLabel>
            <Select
              native
              required
              value={gender}
              onChange={handleChange}
              inputProps={{
                name: 'gender',
                id: 'gender'
              }}
            >
              <option value={'female'}>Feminino</option>
              <option value={'male'}>Masculino</option>
            </Select>
          </FormControl>
        </FormControl>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="height"
          label={MESSAGES.LABEL.HEIGHT}
          name="height"
          autoComplete="height"
          autoFocus
          defaultValue={defaultPacientValues.height}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="weight"
          label={MESSAGES.LABEL.WEIGHT}
          name="weight"
          autoComplete="weight"
          autoFocus
          defaultValue={defaultPacientValues.weight}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {MESSAGES.BUTTONS.CREATE}
        </Button>
      </form>
    </div>
  )
}

export const CreatePatientForm = () => {
  const defaultPacientValues = {
    name: '',
    phone: '',
    birthday: new Date().toISOString().slice(0, 10),
    gender: '',
    height: '',
    weight: ''
  }
  return (
    <PatientForm onSubmit={createNewPatient} defaultPacientValues={defaultPacientValues}/>
  )
}

export const EditPatientForm = ({ patient }) => {
  patient.birthday = patient.birthday.slice(0, 10)
  uuid = patient.uuid
  return (
    <PatientForm onSubmit={updatePatient} defaultPacientValues={patient}/>
  )
}
