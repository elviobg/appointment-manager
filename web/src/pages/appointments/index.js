import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { FormContainer } from './../../components/FormContainer'
import { CreateAppointmentForm } from './form'
import Dashboard from './../../components/Dashboard'
import api from '../../services/api'
import MESSAGES from '../../services/messages'
import { AppointmentsList } from './list'

class Appointments extends Component {
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
        console.log(response.data)
        response.data.id = response.data.uuid
        this.setState({ allAppointments: response.data })
        this.setState({ isLoadingAppointments: false })
        console.log(this.state.allAppointments)
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
              <FormContainer triggerButtonText={MESSAGES.BUTTONS.NEW_APPOINTMENT} form={<CreateAppointmentForm patients={this.state.allPatients}/>} />
          </Grid>
          <AppointmentsList appointments={this.state.allAppointments} hidePatientColumn={false} />
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
