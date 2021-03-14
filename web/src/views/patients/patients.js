import React, { Component } from 'react'
import clsx from 'clsx'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Box from '@material-ui/core/Box'
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
import Link from '@material-ui/core/Link'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { sideBarItems } from './../../components/listItems'
import Orders from './../../components/Orders'
import styles from './patients.style'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import api from '../../services/api'
import { DataGrid } from '@material-ui/data-grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Button } from '@material-ui/core'

const drawerWidth = 240

const columnsBKP = [
  { field: 'id', headerName: 'ID' },
  { field: 'firstName', headerName: 'First name' },
  { field: 'lastName', headerName: 'Last name' },
  { field: 'age', headerName: 'Age', type: 'number' },
  {
    field: 'fullName',
    headerName: 'Full name',
    sortable: false,
    valueGetter: (params) => `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`
  }
]

const rowsBKP = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: null, firstName: 'Harvey', age: 65 }
]

function mountDatagrid (rows) {
  return (
        <React.Fragment>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Birthday</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Height</TableCell>
                <TableCell align="right">Weight</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.uuid}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.birthday}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.height}</TableCell>
                  <TableCell align="right">{row.weight}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
  )
}

class Patients extends Component {
state = {
  open: true,
  isLoading: true,
  allPatients: null
}

handleDrawerOpen = () => {
  this.state.open = true
}

handleDrawerClose = () => {
  this.state.open = false
}

componentDidMount () {
  this.getPatients()
}

async getPatients () {
  try {
    await api.get('/patients')
      .then((response) => {
        console.log(response.data)
        this.setState({ allPatients: response.data })
        this.setState({ isLoading: false })
      })
  } catch (err) {
    console.log(err)
    this.setState({ error: 'Houve um problema com o login, e-mail ou senha inválidos' })
  }
}

render () {
  const { classes } = this.props
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  if (this.state.isLoading) {
    return (<h1>IsLoading</h1>)
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
            onClick={this.handleDrawerOpen()}
            className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={this.state.open}
        classes={{
          paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)
        }}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={this.handleDrawerClose()}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{sideBarItems}</List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
                <Button>
                      New
                </Button>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                { mountDatagrid(this.state.allPatients) }
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}
}

Patients.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(Patients))
