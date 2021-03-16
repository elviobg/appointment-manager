import React, { Component } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { FormContainer } from '../../components/FormContainer'
import { CreatePatientForm } from './form'
import Dashboard from '../../components/Dashboard'
import styles from './style'
import api from '../../services/api'

class Patients extends Component {
state = {
  isLoading: true,
  allPatients: null
}

triggerButtonText = 'Create Pacient'

componentDidMount () {
  this.getPatients()
}

patientRowClick (patient) {
  this.props.history.push({ pathname: '/patients/'.concat(patient.uuid) })
}

async getPatients () {
  try {
    await api.get('/patients')
      .then((response) => {
        this.setState({ allPatients: response.data })
        this.setState({ isLoading: false })
      })
  } catch (err) {
    this.setState({ error: 'Houve um problema ao solicitar os pacientes do servidor' })
  }
}

mountTableBody (rows) {
  if (!rows) return
  return (
        <React.Fragment>
          {rows.map((row) => (
            <TableRow key={row.uuid} onClick={() => this.patientRowClick(row)}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.birthday}</TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell>{row.height}</TableCell>
              <TableCell align="right">{row.weight}</TableCell>
            </TableRow>
          ))}
        </React.Fragment>
  )
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
          <FormContainer triggerButtonText={this.triggerButtonText} form={<CreatePatientForm />} />
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Birthday</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Height</TableCell>
                  <TableCell align="right">Weight</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { this.mountTableBody(this.state.allPatients) }
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

Patients.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(Patients))
