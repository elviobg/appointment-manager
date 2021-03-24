import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { CustomDialog } from 'react-st-modal'

import Grid from '@material-ui/core/Grid'

import { CreatePatientForm } from './form'
import Dashboard from '../../components/Dashboard'
import api from '../../services/api'
import PatientsList from './list'
import MESSAGES from '../../services/messages'
import { Button } from '@material-ui/core'

class Patients extends Component {
state = {
  isLoading: true,
  allPatients: null,
  error: null
}

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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={async () => {
              await CustomDialog(<CreatePatientForm/>, { title: MESSAGES.BUTTONS.CREATE_PACIENT, showCloseIcon: true })
                .then((response) => {
                  if (response.status === 200) {
                    this.props.history.push({ pathname: '/patients/'.concat(response.patient.uuid) })
                  }
                })
            }}
          >
          {MESSAGES.BUTTONS.CREATE_PACIENT}
          </Button>
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
