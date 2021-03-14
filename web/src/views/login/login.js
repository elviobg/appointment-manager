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
import styles from './login.style'
import api from '../../services/api'
import { login, isAuthenticated } from '../../services/auth'
import { withRouter } from 'react-router-dom'

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
      this.setState({ error: 'Preencha e-mail e senha para continuar!' })
    } else {
      try {
        const response = await api.post('/users/login', { email, password })
        login(response.data.token)
        this.props.history.push('/home')
      } catch (err) {
        this.setState({ error: 'Houve um problema com o login, e-mail ou senha inválidos' })
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
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
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
              label="Password"
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
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2" to='/home'>
                  {"Don't have an account? Sign Up"}
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
