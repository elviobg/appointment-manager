import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Register from './views/register/register'
import Login from './views/login/login'
import Patients from './views/patients/patients'
import Appointments from './views/appointments'
import { isAuthenticated } from './services/auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated()
        ? (<Component {...props} />)
        : (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
    }
  />
)

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/register" component={ Register } />
      <PrivateRoute path="/home" component={ Patients } />
      <PrivateRoute path="/appointments" component={ Appointments } />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
)

export default Routes
