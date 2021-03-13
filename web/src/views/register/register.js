import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import PropTypes from 'prop-types'
import styles from './register.style'
import api from '../../services/api'
import { withRouter } from 'react-router-dom'

class SignUp extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    error: ''
  }

  handleSubmit = async event => {
    event.preventDefault()
    const { history } = this.props
    const { firstname, lastname, email, password } = this.state

    if (!firstname || !lastname || !email || !password) {
      this.setState({ error: 'Preencha todos os dados para se cadastrar.' })
    } else {
      try {
        await api.post('/users', { firstname, lastname, email, password })
        history.push('/home')
      } catch (err) {
        this.setState({ error: 'Ocorreu um erro ao registrar sua conta.' })
      }
    }
  }

  render () {
    const { classes } = this.props
    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            {this.state.error && <p>{this.state.error}</p>}
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    autoFocus
                    onChange={e => this.setState({ firstname: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={e => this.setState({ lastname: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                </Grid>
              </Grid>
              <Button onClick={this.handleSubmit.bind(this)}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to='/' href="#" variant="body2" >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
    )
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(SignUp))