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
import FormControl from '@material-ui/core/FormControl'

import { FormContainer } from './../../components/FormContainer'
import { CreateAppointmentForm, EditAppointmentForm } from './form'
import Dashboard from './../../components/Dashboard'
import api from '../../services/api'
import styles from './style'

class Appointments extends Component {
state = {
  isLoadingPacients: true,
  isLoadingAppointments: true,
  allPatients: null,
  allAppointments: null
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

async deleteAppointment (uuid) {
  try {
    await api.delete('/appointments/'.concat(uuid))
      .then((response) => {
        this.getAppointments()
      })
  } catch (err) {
    this.setState({ error: 'Não foi possivel obter todos os agendamentos' })
  }
}

async editAppointment (uuid, date, observation) {
  console.log('EDIT')
  console.log(uuid)
  console.log(date)
  console.log(observation)
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

mountDatagrid (rows, classes) {
  if (!rows) return
  return (
        <React.Fragment>
          {rows.map((row) => (
            <TableRow key={row.uuid}>
              <TableCell onClick={() => this.editAppointment(row.uuid, row.date, row.observation)}>
                  {row.patient.name}
              </TableCell>
              <TableCell onClick={() => this.editAppointment(row.uuid, row.date, row.observation)}>
                {
                new Intl.DateTimeFormat('pt-BR', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric'
                }).format(new Date(row.date))
                }
              </TableCell>
              <TableCell onClick={() => this.editAppointment(row.uuid, row.date, row.observation)} align="right">
                {row.observation}
              </TableCell>
              <TableCell align="right">
                <Button>
                  <FormContainer triggerButtonText={<EditIcon/>} form={<EditAppointmentForm patients={this.state.allPatients}/>} />
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  title="delete">
                  <DeleteForeverIcon onClick={() => this.deleteAppointment(row.uuid)}/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </React.Fragment>
  )
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
              <FormContainer triggerButtonText={this.triggerButtonText} form={<CreateAppointmentForm patients={this.state.allPatients}/>} />
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Patient</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Observation</TableCell>
                    <TableCell/>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { this.mountDatagrid(this.state.allAppointments, classes) }
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
