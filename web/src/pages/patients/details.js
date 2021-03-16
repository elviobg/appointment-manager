import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'

import Dashboard from './../../components/Dashboard'
import styles from './style'
import api from './../../services/api'

class PatientDetails extends Component {
  state = {
    isLoading: true,
    patient: null
  }

  componentDidMount () {
    this.getPatientByUuid(this.props.match.params.id.split('id=')[1])
  }

  async getPatientByUuid (uuid) {
    console.log(uuid)
    try {
      await api.get('/patients/'.concat(uuid))
        .then((response) => {
          this.setState({ patient: response.data[0] })
          this.setState({ isLoading: false })
          console.log('carregou do db ->', response.data[0])
        })
    } catch (err) {
      this.setState({ error: 'Não foi possivel obter todos os agendamentos' })
    }
  }

  render () {
    if (this.state.isLoading) {
      return (<h1>Is Loading... please wait...</h1>)
    }
    const { classes } = this.props
    console.log(this.state)
    console.log(this.state.patient)

    return (
      <Dashboard contentBoard={
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={classes.paper}>
              <h1>{this.state.patient.name}</h1>
              <p className={classes.p}>Phone: {this.state.patient.phone}</p>
              <p className={classes.p}>Birthday: {this.state.patient.birthday.split('T')[0]}</p>
              <p className={classes.p}>Altura: {this.state.patient.height} m</p>
              <p className={classes.p}>Peso: {this.state.patient.weight} kg</p>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={classes.paper}>
                <Button
                  spacing={3}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Edit
                </Button>
                <Button
                  spacing={3}
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                >
                  Delete
                </Button>
            </Paper>
          </Grid>
          <Grid item xs={12}>
          <Paper className={classes.paper}>
              {/* list of appointments */}
            </Paper>
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
