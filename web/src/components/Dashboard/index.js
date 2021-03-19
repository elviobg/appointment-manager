import React, { Component } from 'react'
import clsx from 'clsx'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

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
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PeopleIcon from '@material-ui/icons/People'
import AssignmentIcon from '@material-ui/icons/Assignment'

import styles from './dashboard.style'
import ToogleMenuList from '../ToggleMenuList'
import { getUserFullName } from './../../services/auth'
import MESSAGES from './../../services/messages'

class DashBoard extends Component {
state = {
  open: true
}

handleDrawerOpen = () => {
  this.setState({ open: true })
}

handleDrawerClose = () => {
  this.setState({ open: false })
}

render () {
  const { classes } = this.props
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
          <Typography component="h2" variant="h6" color="inherit" noWrap>
            {getUserFullName()}
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
          <ListItem button component={Link} to='/patients'>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary={MESSAGES.LABEL.PATIENTS} />
          </ListItem>
          <ListItem button component={Link} to='/appointments'>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary={MESSAGES.LABEL.APPOINTMENTS} />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          { this.props.contentBoard }
        </Container>
      </main>
    </div>
  )
}
}

DashBoard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(DashBoard))
