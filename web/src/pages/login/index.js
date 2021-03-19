import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

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

import styles from './style'
import api from '../../services/api'
import { login, isAuthenticated } from '../../services/auth'
import MESSAGES from '../../services/messages'

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    error: null
  }

  handleSignIn = async event => {
    event.preventDefault()
    const { email, password } = this.state
    if (!email || !password) {
      this.setState({ error: MESSAGES.ERROR.MISSING_FIELDS_REGISTER })
    } else {
      try {
        const response = await api.post('/users/login', { email, password })
        login(response.data.token, response.data.fullname)
        this.props.history.push('/home')
      } catch (err) {
        this.setState({ error: MESSAGES.ERROR.INVALID_LOGIN })
      }
    }
  }

  componentDidMount () {
    if (isAuthenticated()) {
      this.props.history.push('/home')
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
            {MESSAGES.SIGNIN.LOGIN}
          </Typography>
          <form className={classes.form} validate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={MESSAGES.LABEL.EMAIL}
              name="email"
              autoComplete="email"
              autoFocus
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label={MESSAGES.LABEL.PASSWORD}
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
            {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
            <Button onClick={this.handleSignIn.bind(this)}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {MESSAGES.SIGNIN.LOGIN}
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" to='/register'>
                  {MESSAGES.SIGNIN.LINK_SIGUP}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    )
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(SignIn))
