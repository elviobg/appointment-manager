import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import Dashboard from './../../components/Dashboard'
import styles from './style'
import api from './../../services/api'
import { FormContainer } from '../../components/FormContainer'
import { EditPatientForm } from './form'
import { AppointmentsList } from './../appointments/list'
import { CreateAppointmentToPatientForm } from './../appointments/form'

class PatientDetails extends Component {
  state = {
    isLoadingPatient: true,
    isLoadingAppointments: true,
    patient: null,
    appointments: null
  }

  triggerButtonText = 'Edit'

  componentDidMount () {
    this.getPatientByUuid()
    this.getAppointmentsByPatient()
  }

  async getPatientByUuid () {
    console.log(this.props.match.params.id)
    try {
      await api.get('/patients/'.concat(this.props.match.params.id))
        .then((response) => {
          this.setState({ patient: response.data[0] })
          this.setState({ isLoadingPatient: false })
          console.log('carregou do db ->', response.data[0])
        })
    } catch (err) {
      this.setState({ error: 'Não foi possivel obter todos os agendamentos' })
    }
  }

  async deletePatient () {
    try {
      await api.delete('/patients/'.concat(this.state.patient.uuid))
        .then((response) => {
          this.props.history.push({ pathname: '/patients' })
        })
    } catch (err) {
      this.setState({ error: 'Não foi possivel obter todos os agendamentos' })
    }
  }

  async getAppointmentsByPatient () {
    try {
      await api.get('/appointments/patient/'.concat(this.props.match.params.id))
        .then((response) => {
          console.log('carregou appointments do db ->', response.data[0])
          this.setState({ appointments: response.data })
          this.setState({ isLoadingAppointments: false })
        })
    } catch (err) {
      this.setState({ error: 'Não foi possivel obter todos os agendamentos' })
    }
  }

  render () {
    if (this.state.isLoadingAppointments || this.state.isLoadingPatient) {
      return (<h1>Is Loading... please wait...</h1>)
    }
    const { classes } = this.props

    return (
      <Dashboard contentBoard={
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={classes.paper}>
              <h1>{this.state.patient.name}</h1>
              <p className={classes.p}>Phone: {this.state.patient.phone}</p>
              <p className={classes.p}>Birthday: {this.state.patient.birthday.split('T')[0]}</p>
              <p className={classes.p}>Gender: {this.state.patient.gender}</p>
              <p className={classes.p}>Altura: {this.state.patient.height} m</p>
              <p className={classes.p}>Peso: {this.state.patient.weight} kg</p>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={classes.paper}>
                <FormContainer triggerButtonText={this.triggerButtonText} form={<EditPatientForm patient={this.state.patient} />} />
                <Button
                  spacing={3}
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={() => this.deletePatient()}
                >
                  Delete
                </Button>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <FormContainer triggerButtonText={'New Appointment'} form={<CreateAppointmentToPatientForm preDefinedPatient={this.state.patient}/>} />
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid item xs={12}>
                <h2>Appointments</h2>
              </Grid>
              <AppointmentsList appointments={ this.state.appointments }/>
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
