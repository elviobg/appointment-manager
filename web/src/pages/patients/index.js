import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { FormContainer } from '../../components/FormContainer'
import { CreatePatientForm } from './form'
import Dashboard from '../../components/Dashboard'
import styles from './style'
import api from '../../services/api'
import PatientsList from './list'

class Patients extends Component {
state = {
  isLoading: true,
  allPatients: null
}

triggerButtonText = 'Create Pacient'

componentDidMount () {
  this.getPatients()
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
  if (this.state.isLoading) {
    return (<h1>Is Loading... please wait...</h1>)
  }

  return (
    <Dashboard contentBoard={
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <FormContainer triggerButtonText={this.triggerButtonText} form={<CreatePatientForm />} />
        </Grid>
          <PatientsList patients={this.state.allPatients} history={this.props.history}/>
      </Grid>
    }
    />
  )
}
}

Patients.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(Patients)
