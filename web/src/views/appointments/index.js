import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import api from '../../services/api'
import styles from './appointments.style'
import { FormContainer } from './../components/FormContainer'
import { AppointmentForm } from './newAppointmentForm'
import Dashboard from './../components/Dashboard'

function mountDatagrid (rows) {
  if (!rows) return
  console.log(rows)
  return (
        <React.Fragment>
          {rows.map((row) => (
            <TableRow key={row.uuid}>
              <TableCell>{row.patientUuid}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell align="right">{row.observation}</TableCell>
            </TableRow>
          ))}
        </React.Fragment>
  )
}

class Appointments extends Component {
state = {
  isLoadingPacients: true,
  isLoadingAppointments: true,
  allPatients: null,
  allAppointments: null
}

triggerText = 'Create Appointment'

componentDidMount () {
  this.getPacients()
  this.getAppointments()
}

createNewAppointment = async (event) => {
  event.preventDefault(event)
  const date = event.target.date.value
  const patientUuid = event.target.patient.value
  let observation = null
  if (typeof event.target.observation !== 'undefined') {
    observation = event.target.observation.value
  }
  this.insertNewAppointment(date, patientUuid, observation)
}

async insertNewAppointment (date, patientUuid, observation) {
  try {
    await api.post('/appointments', { date, patient_id: patientUuid, observation })
      .then((response) => {
        this.getAppointments()
      })
  } catch (err) {
    this.setState({ error: 'Houve um problema ao criar novo usuário' })
  }
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

isLoading () {
  if (this.isLoadingAppointments || this.isLoadingPacients) return true
  return false
}

render () {
  const { classes } = this.props
  if (this.isLoading()) {
    return (<h1>Is Loading... please wait...</h1>)
  }

  return (
      <Dashboard contentBoard={
        <Grid container spacing={1}>
          <Grid item xs={3}>
              <FormContainer triggerText={this.triggerText} form={<AppointmentForm onSubmit={this.createNewAppointment} patients={this.state.allPatients}/>} />
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Patient</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Observation</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { mountDatagrid(this.state.allAppointments) }
                </TableBody>
              </Table>
            </Paper>
          </Grid>
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
