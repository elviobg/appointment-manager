import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import DeleteForeverIcon from '@material-ui/icons/DeleteForeverOutlined'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'

import { FormContainer } from './../../components/FormContainer'
import { CreateAppointmentForm, EditAppointmentForm } from './form'
import Dashboard from './../../components/Dashboard'
import api from '../../services/api'
import styles from './style'
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
        this.setState({ allAppointments: response.data })
        this.setState({ isLoadingAppointments: false })
      })
  } catch (err) {
    this.setState({ error: 'Não foi possivel obter todos os agendamentos' })
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
    this.setState({ error: 'Houve um problema ao solicitar os pacientes do servidor' })
  }
}

render () {
  const { classes } = this.props
  if (this.state.isLoadingAppointments || this.state.isLoadingPacients) {
    return (<h1>Is Loading... please wait...</h1>)
  }

  return (
      <Dashboard contentBoard={
        <Grid container spacing={1}>
          <Grid item xs={3}>
              <FormContainer triggerButtonText={this.triggerButtonText} form={<CreateAppointmentForm patients={this.state.allPatients}/>} />
          </Grid>
          <AppointmentsList appointments={this.state.allAppointments} />
        </Grid>
      }
      />
  )
}
}

Appointments.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(Appointments))
