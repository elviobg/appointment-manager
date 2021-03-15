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
import { CreateAppointmentForm } from './newAppointmentForm'
import Dashboard from './../components/Dashboard'
import DeleteForeverIcon from '@material-ui/icons/DeleteForeverOutlined'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'

async function deleteAppointment (uuid) {
  console.log('DELETE')
  console.log(uuid)
}

async function editAppointment (uuid, date, observation) {
  console.log('EDIT')
  console.log(uuid)
  console.log(date)
  console.log(observation)
}

function mountDatagrid (rows) {
  if (!rows) return
  console.log(rows)
  return (
        <React.Fragment>
          {rows.map((row) => (
            <TableRow key={row.uuid}>
              <TableCell onClick={() => editAppointment(row.uuid, row.date, row.observation)}>
                  {row.patient.name}
              </TableCell>
              <TableCell onClick={() => editAppointment(row.uuid, row.date, row.observation)}>
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
              <TableCell onClick={() => editAppointment(row.uuid, row.date, row.observation)} align="right">
                {row.observation}
              </TableCell>
              <TableCell align="right">
              <Button title="delete">
                  <EditIcon onClick={() => editAppointment(row.uuid, row.date, row.observation)}/>
                </Button>
                <Button title="delete">
                  <DeleteForeverIcon onClick={() => deleteAppointment(row.uuid)}/>
                </Button>
              </TableCell>
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
              <FormContainer triggerText={this.triggerText} form={<CreateAppointmentForm patients={this.state.allPatients}/>} />
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
