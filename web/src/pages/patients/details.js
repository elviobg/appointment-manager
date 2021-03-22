import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Confirm } from 'react-st-modal'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import Dashboard from './../../components/Dashboard'
import styles from './style'
import api from './../../services/api'
import { FormContainer } from '../../components/FormContainer'
import { EditPatientForm } from './form'
import AppointmentsList from './../appointments/list'
import { CreateAppointmentToPatientForm, EditAppointmentForm } from './../appointments/form'
import MESSAGES from '../../services/messages'

class PatientDetails extends Component {
  state = {
    isLoadingPatient: true,
    isLoadingAppointments: true,
    patient: null,
    appointments: null,
    error: null
  }

  componentDidMount () {
    this.getPatientByUuid()
    this.getAppointmentsByPatient()
  }

  async getPatientByUuid () {
    console.log(this.props.match.params.id)
    try {
      await api.get('/patients/'.concat(this.props.match.params.id))
        .then((response) => {
          this.setState({ patient: response.data })
          this.setState({ isLoadingPatient: false })
        })
    } catch (err) {
      this.setState({ error: MESSAGES.ERROR.DB_CONNECTION })
    }
  }

  async deletePatient () {
    try {
      await api.delete('/patients/'.concat(this.state.patient.uuid))
        .then((response) => {
          this.props.history.push({ pathname: '/patients' })
        })
    } catch (err) {
      this.setState({ error: MESSAGES.ERROR.DB_CONNECTION })
    }
  }

  async getAppointmentsByPatient () {
    try {
      await api.get('/appointments/patient/'.concat(this.props.match.params.id))
        .then((response) => {
          this.setState({ appointments: response.data })
          this.setState({ isLoadingAppointments: false })
        })
    } catch (err) {
      this.setState({ error: MESSAGES.ERROR.DB_CONNECTION })
    }
  }

  createAppointment = async event => {
    event.preventDefault(event)
    const date = event.target.date.value
    let observation = null
    if (typeof event.target.observation !== 'undefined') {
      observation = event.target.observation.value
    }

    try {
      await api.post('/appointments', { date, patient_id: this.state.patient.uuid, observation })
        .then((response) => {
          this.getAppointmentsByPatient()
        })
    } catch (err) {
      this.state({ error: MESSAGES.ERROR.DB_CONNECTION })
    }
  }

  editAppointment = async event => {
    event.preventDefault(event)
    let observation = null
    if (typeof event.target.observation !== 'undefined') {
      observation = event.target.observation.value
    }

    console.log('edit...')
    console.log(event.target.date.value)
    console.log(observation)
    try {
      await api.patch('/appointments/'.concat(event.target.date.value), { observation })
        .then((response) => {
          this.getAppointmentsByPatient()
        })
    } catch (err) {
      this.setState({ error: MESSAGES.ERROR.DB_CONNECTION })
    }
  }

  updatePatient = async event => {
    event.preventDefault(event)
    const name = event.target.name.value
    const phone = event.target.phone.value
    const birthday = event.target.birthday.value
    const gender = event.target.gender.value
    const height = event.target.height.value
    const weight = event.target.weight.value
    try {
      await api.put('/patients/'.concat(this.state.patient.uuid), { name, phone, birthday, gender, height, weight })
        .then((response) => {
          this.getPatientByUuid()
        })
    } catch (err) {
      this.state({ error: MESSAGES.ERROR.DB_CONNECTION })
    }
  }

  render () {
    if (this.state.isLoadingAppointments || this.state.isLoadingPatient) {
      return (<h1>{MESSAGES.FEEDBACK.LOADING}</h1>)
    }
    const { classes } = this.props

    return (
      <Dashboard contentBoard={
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={classes.paper}>
              <h1>{this.state.patient.name}</h1>
              <p className={classes.p}>{MESSAGES.LABEL.PHONE}: {this.state.patient.phone}</p>
              <p className={classes.p}>{MESSAGES.LABEL.BIRTHDAY}: {this.state.patient.birthday.split('T')[0]}</p>
              <p className={classes.p}>{MESSAGES.LABEL.GENDER}: {this.state.patient.gender}</p>
              <p className={classes.p}>{MESSAGES.LABEL.HEIGHT}: {this.state.patient.height} m</p>
              <p className={classes.p}>{MESSAGES.LABEL.WEIGHT}: {this.state.patient.weight} kg</p>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={classes.paper}>
                <FormContainer triggerButtonText={MESSAGES.BUTTONS.EDIT} form={<EditPatientForm onSubmit={this.updatePatient} patient={this.state.patient} />} />
                <Button
                  spacing={3}
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={async () => {
                    const result = await Confirm(MESSAGES.ALERT.CONFIRM_EXCLUDE, MESSAGES.ALERT.EXCLUDE_PATIENT)
                    if (result) {
                      this.deletePatient()
                    }
                  }}
                >
                  {MESSAGES.BUTTONS.DELETE}
                </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <FormContainer triggerButtonText={MESSAGES.BUTTONS.NEW_APPOINTMENT} form={<CreateAppointmentToPatientForm preDefinedPatient={this.state.patient} onSubmit={this.createAppointment}/>} />
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <FormContainer triggerButtonText={MESSAGES.BUTTONS.EDIT_APPOINTMENT} form={<EditAppointmentForm preDefinedPatient={this.state.patient} appointments={this.state.appointments} onSubmit={this.editAppointment}/>} />
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid item xs={12}>
                <h2>{MESSAGES.LABEL.APPOINTMENTS}</h2>
              </Grid>
              <AppointmentsList appointments={this.state.appointments} hidePatientColumn={true}/>
            </Paper>
          </Grid>
        </Grid>
      }
      />
    )
  }
}

PatientDetails.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(PatientDetails))
