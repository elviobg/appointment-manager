import React, { Component } from 'react'
import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import styles from './appointments.style'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import api from '../../services/api'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import ToogleMenuList from './../components/ToggleMenuList'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PeopleIcon from '@material-ui/icons/People'
import AssignmentIcon from '@material-ui/icons/Assignment'

import { NewAppointmentContainer } from './newAppointmentContainer'

function mountDatagrid (rows) {
  if (!rows) return
  return (
        <React.Fragment>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Observation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.uuid}>
                  <TableCell>{row.patientUuid}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell align="right">{row.observation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
  )
}

class Appointments extends Component {
state = {
  open: true,
  isLoading: true,
  allAppointments: null
}

triggerText = 'Create Appointment'

handleDrawerOpen = () => {
  this.setState({ open: true })
  console.log('open', this.state.open)
}

handleDrawerClose = () => {
  this.setState({ open: false })
  console.log('close', this.state.open)
}

componentDidMount () {
  this.getAppointments()
}

createNewAppointment = async (event) => {
  event.preventDefault(event)
  const name = event.target.name.value
  const phone = event.target.phone.value
  const birthday = event.target.birthday.value
  const gender = event.target.gender.value
  const height = event.target.height.value
  const weight = event.target.weight.value
  this.insertNewPatient(name, phone, birthday, gender, height, weight)
}

async insertNewAppointment (name, phone, birthday, gender, height, weight) {
  try {
    await api.post('/appointments', { name, phone, birthday, gender, height, weight })
      .then((response) => {
        console.log(response)
        this.getPatients()
      })
  } catch (err) {
    this.setState({ error: 'Houve um problema ao criar novo usuário' })
  }
}

async getAppointments () {
  try {
    await api.get('/appointments')
      .then((response) => {
        this.setState({ allAppointments: response.data })
        this.setState({ isLoading: false })
        console.log(response.data)
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
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen.bind(this)}
            className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            ProntoMed
          </Typography>
          <IconButton color="inherit">
            <Badge color="secondary">
              <ToogleMenuList />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={ this.state.open }
        classes={{
          paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)
        }}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={this.handleDrawerClose.bind(this)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
        <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={3}>
                <NewAppointmentContainer triggerText={this.triggerText} onSubmit={this.createNewAppointment} />
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                { mountDatagrid(this.state.allAppointments) }
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}
}

Appointments.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(Appointments))
