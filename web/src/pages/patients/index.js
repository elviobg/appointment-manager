import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { FormContainer } from '../../components/FormContainer'
import { CreatePatientForm } from './form'
import Dashboard from '../../components/Dashboard'
import api from '../../services/api'
import PatientsList from './list'
import MESSAGES from '../../services/messages'

class Patients extends Component {
state = {
  isLoading: true,
  allPatients: null,
  error: null
}

componentDidMount () {
  this.getPatients()
}

createNewPatient = async event => {
  event.preventDefault(event)
  const name = event.target.name.value
  const phone = event.target.phone.value
  const birthday = event.target.birthday.value
  const gender = event.target.gender.value
  const height = event.target.height.value
  const weight = event.target.weight.value
  try {
    await api.post('/patients', { name, phone, birthday, gender, height, weight })
      .then((response) => {
        this.getPatients()
      })
  } catch (error) {
    this.state.error = MESSAGES.ERROR.DB_CONNECTION
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
    this.setState({ error: MESSAGES.ERROR.DB_CONNECTION })
  }
}

render () {
  if (this.state.isLoading) {
    return (<h1>{MESSAGES.FEEDBACK.LOADING}</h1>)
  }

  return (
    <Dashboard contentBoard={
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <FormContainer triggerButtonText={MESSAGES.BUTTONS.CREATE_PACIENT} form={<CreatePatientForm onSubmit={this.createNewPatient} />} />
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
