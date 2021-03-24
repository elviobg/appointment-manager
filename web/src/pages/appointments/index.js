import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { FormContainer } from './../../components/FormContainer'
import { CreateAppointmentForm } from './form'
import Dashboard from './../../components/Dashboard'
import api from '../../services/api'
import MESSAGES from '../../services/messages'
import AppointmentsList from './list'

class Appointments extends Component {
  constructor (props) {
    super(props)

    this.removeAppointment = this.removeAppointment.bind(this)
  }

  removeAppointment (uuid) {
    this.setState({ allAppointments: this.state.allAppointments.filter(appointment => appointment.uuid !== uuid) })
  }

state = {
  isLoadingPacients: true,
  isLoadingAppointments: true,
  allPatients: null,
  allAppointments: null,
  error: null
}

triggerButtonText = 'Create Appointment'

componentDidMount () {
  this.getPacients()
  this.getAppointments()
}

async getAppointments () {
  try {
    await api.get('/appointments')
      .then((response) => {
        response.data.id = response.data.uuid
        this.setState({ allAppointments: response.data })
        this.setState({ isLoadingAppointments: false })
      })
  } catch (err) {
    this.setState({ error: MESSAGES.ERROR.DB_CONNECTION })
  }
}

createAppointment = async event => {
  event.preventDefault(event)
  const patientUuid = event.target.patient.value
  const date = event.target.date.value
  let observation = null
  if (typeof event.target.observation !== 'undefined') {
    observation = event.target.observation.value
  }

  try {
    await api.post('/appointments', { date, patient_id: patientUuid, observation })
      .then((response) => {
        this.getAppointments()
      })
  } catch (err) {
    this.setState({ error: MESSAGES.ERROR.DB_CONNECTION })
  }
}

async getPacients () {
  try {
    await api.get('/patients')
      .then((response) => {
        this.setState({ allPatients: response.data })
        this.setState({ isLoadingPacients: false })
      })
  } catch (err) {
    this.setState({ error: MESSAGES.ERROR.DB_CONNECTION })
  }
}

render () {
  if (this.state.isLoadingAppointments || this.state.isLoadingPacients) {
    return (<h1>{MESSAGES.FEEDBACK.LOADING}</h1>)
  }

  return (
      <Dashboard contentBoard={
        <Grid container spacing={1}>
          <Grid item xs={3}>
              <FormContainer triggerButtonText={MESSAGES.BUTTONS.NEW_APPOINTMENT} form={<CreateAppointmentForm onSubmit={this.createAppointment} patients={this.state.allPatients}/>} />
          </Grid>
          <AppointmentsList removeAppointment={this.removeAppointment} appointments={this.state.allAppointments} hidePatientColumn={false} />
        </Grid>
      }
      />
  )
}
}

Appointments.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(Appointments)
