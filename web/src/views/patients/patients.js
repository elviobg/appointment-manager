import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import styles from './patients.style'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import api from '../../services/api'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { FormContainer } from './../components/FormContainer'
import { PatientForm } from './newPatientForm'
import Dashboard from './../components/Dashboard'

function mountTableBody (rows) {
  if (!rows) return
  return (
        <React.Fragment>
          {rows.map((row) => (
            <TableRow key={row.uuid}>
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

class Patients extends Component {
state = {
  isLoading: true,
  allPatients: null
}

triggerText = 'Create Pacient'

componentDidMount () {
  this.getPatients()
}

createNewPatient = async (event) => {
  event.preventDefault(event)
  const name = event.target.name.value
  const phone = event.target.phone.value
  const birthday = event.target.birthday.value
  const gender = event.target.gender.value
  const height = event.target.height.value
  const weight = event.target.weight.value
  this.insertNewPatient(name, phone, birthday, gender, height, weight)
}

async insertNewPatient (name, phone, birthday, gender, height, weight) {
  try {
    await api.post('/patients', { name, phone, birthday, gender, height, weight })
      .then((response) => {
        console.log(response)
        this.getPatients()
      })
  } catch (err) {
    this.setState({ error: 'Houve um problema ao criar novo usuário' })
  }
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

render () {
  const { classes } = this.props
  if (this.state.isLoading) {
    return (<h1>Is Loading... please wait...</h1>)
  }

  return (
    <Dashboard contentBoard={
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <FormContainer triggerText={this.triggerText} form={<PatientForm onSubmit={this.createNewPatient} />} />
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
                { mountTableBody(this.state.allPatients) }
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
