import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import Dashboard from './../../components/Dashboard'
import styles from './style'
import api from './../../services/api'

class PatientDetails extends Component {
  state = {
    isLoading: true,
    patient: null
  }

  componentDidMount () {
    this.setState({ isLoading: false })
    this.getPatientByUuid(this.props.match.params.id.split('id=')[1])
  }

  async getPatientByUuid (uuid) {
    console.log(uuid)
    try {
      await api.get('/patients/'.concat(uuid))
        .then((response) => {
          this.setState({ patient: response.data[0] })
          this.setState({ isLoading: false })
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
          <Grid item xs={12}>
            <h1>Detalhes {this.props.match.params.id}</h1>
          </Grid>
          <Grid item xs={12}>
            <h1>Lista de consultas</h1>
          </Grid>
        </Grid>
      }
      />
    )
  }
}

PatientDetails.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(PatientDetails))
