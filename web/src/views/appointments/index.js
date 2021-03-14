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
  isLoading: true,
  allAppointments: null
}

triggerText = 'Create Appointment'

componentDidMount () {
  this.getAppointments()
}

createNewAppointment = async (event) => {
  event.preventDefault(event)
  const name = event.target.name.value
  const phone = event.target.phone.value
  const birthday = event.target.birthday.value
  const gender = event.target.gender.value
  const height = event.target.height.value
  const weight = event.target.weight.value
  this.insertNewPatient(name, phone, birthday, gender, height, weight)
}

async insertNewAppointment (name, phone, birthday, gender, height, weight) {
  try {
    await api.post('/appointments', { name, phone, birthday, gender, height, weight })
      .then((response) => {
        console.log(response)
        this.getPatients()
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
        this.setState({ isLoading: false })
        console.log(response.data)
      })
  } catch (err) {
    this.setState({ error: 'Não foi possivel obter todos os agendamentos' })
  }
}

render () {
  const { classes } = this.props
  if (this.state.isLoading) {
    return (<h1>Is Loading... please wait...</h1>)
  }

  return (
      <Dashboard contentBoard={
        <Grid container spacing={1}>
          <Grid item xs={3}>
              <FormContainer triggerText={this.triggerText} form={<AppointmentForm onSubmit={this.createNewAppointment} />} />
          </Grid>
          {/* Recent Orders */}
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
