import React, { useState } from 'react'
import InputMask from 'react-input-mask'
import moment from 'moment'
import { useDialog } from 'react-st-modal'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'

import MESSAGES from './../../services/messages'
import api from './../../services/api'

const state = {
  error: '',
  patientUuid: '',
  dialog: null
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
  },
  modalbody: {
    margin: theme.spacing(2)
  },
  modalarea: {
    margin: theme.spacing(2)
  }
}))

const CreateNewPatient = async event => {
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
        state.dialog.close({ status: 200, patient: response.data })
      })
  } catch (error) {
    state.error = MESSAGES.ERROR.DB_CONNECTION
  }
}

const updatePatient = async event => {
  event.preventDefault(event)
  const name = event.target.name.value
  const phone = event.target.phone.value
  const birthday = event.target.birthday.value
  const gender = event.target.gender.value
  const height = event.target.height.value
  const weight = event.target.weight.value
  try {
    await api.put('/patients/'.concat(state.patientUuid), { name, phone, birthday, gender, height, weight })
      .then((response) => {
        state.dialog.close({ status: 200, patient: response.data })
      })
  } catch (err) {
    state({ error: MESSAGES.ERROR.DB_CONNECTION })
  }
}

export const PatientForm = ({ onSubmit, defaultPacientValues }) => {
  const classes = useStyles()
  const [gender, setGender] = useState(defaultPacientValues.gender)
  const handleChangeGender = (event) => {
    setGender(event.target.value)
  }
  const [phone, setPhone] = useState(defaultPacientValues.phone)
  const handleChangePhone = (event) => {
    setPhone(event.target.value)
  }
  const [height, handleHeight] = useState(defaultPacientValues.height)
  const handleChangeHeight = (event) => {
    handleHeight(event.target.value)
  }
  const [weight, handleWeight] = useState(defaultPacientValues.weight)
  const handleChangeWeight = (event) => {
    handleWeight(event.target.value)
  }
  console.log(defaultPacientValues)
  state.dialog = useDialog()

  return (
    <div className={classes.modalbody}>
      <CssBaseline />
      <form onSubmit={onSubmit} className={classes.form} validate>
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
        <InputMask
          mask="(99) 9 9999-9999"
          value={phone}
          onChange={handleChangePhone}
          disabled={false}
          maskChar=" "
        >
          {() => <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label={MESSAGES.LABEL.PHONE}
            name="phone"
            autoComplete="phone"
            autoFocus
          />}
        </InputMask>
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
            defaultValue={moment(defaultPacientValues.birthday, 'DD/MM/YYYY').format('YYYY-MM-DD')}
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
              onChange={handleChangeGender}
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
          type="number"
          step={0.01}
          value={height}
          onChange={handleChangeHeight}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="height"
          label={MESSAGES.LABEL.HEIGHT}
          name="height"
          autoComplete="height"
          autoFocus
          isNumericString
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          type="number"
          step={0.01}
          value={weight}
          onChange={handleChangeWeight}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="weight"
          label={MESSAGES.LABEL.WEIGHT}
          name="weight"
          autoComplete="weight"
          autoFocus
          InputLabelProps={{
            shrink: true
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {MESSAGES.BUTTONS.SAVE}
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
      <PatientForm onSubmit={CreateNewPatient} defaultPacientValues={defaultPacientValues}/>
  )
}

export const EditPatientForm = ({ patient, onSubmit }) => {
  state.patientUuid = patient.uuid
  return (
    <PatientForm onSubmit={updatePatient} defaultPacientValues={patient}/>
  )
}
