import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Register from './pages/register'
import Login from './pages/login'
import Patients from './pages/patients'
import PatientDetails from './pages/patients/details'
import Appointments from './pages/appointments'
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
      <Redirect from="/home" to="/patients" />
      <PrivateRoute path="/patients/:id" component={ PatientDetails } />
      <PrivateRoute path="/patients" component={ Patients } />
      <PrivateRoute path="/appointments" component={ Appointments } />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
)

export default Routes
