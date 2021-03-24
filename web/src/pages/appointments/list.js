import React, { Component } from 'react'
import { Confirm } from 'react-st-modal'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import { DataGrid, CellParams, GridApi } from '@material-ui/data-grid'
import Paper from '@material-ui/core/Paper'
import DeleteForeverIcon from '@material-ui/icons/DeleteForeverOutlined'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import styles from './style'
import api from '../../services/api'
import MESSAGES from '../../services/messages'

class AppointmentsList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      appointments: this.props.appointments
    }
  }

  async deleteAppointment (uuid) {
    try {
      await api.delete('/appointments/'.concat(uuid))
        .then((response) => {
          this.props.removeAppointment(uuid)
        })
    } catch (err) {
      this.setState({ error: MESSAGES.ERROR.DB_CONNECTION })
    }
  }

  columns = [
    { field: 'uuid', hide: true },
    {
      field: 'patient',
      hide: this.props.hidePatientColumn,
      flex: 3,
      headerName: MESSAGES.LABEL.PATIENT,
      valueGetter: (params) => {
        return params.row.patient.name
      }
    },
    { field: 'date', flex: 2, headerName: MESSAGES.LABEL.DATE },
    { field: 'observation', flex: 4, headerName: MESSAGES.LABEL.OBSERVATION },
    {
      field: '',
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params: CellParams) => {
        const onClick = () => {
          const api: GridApi = params.api
          const fields = api
            .getAllColumns()
            .map((c) => c.field)
            .filter((c) => c !== '__check__' && !!c)
          const thisRow = {}

          fields.forEach((f) => {
            thisRow[f] = params.getValue(f)
          })
          return this.deleteAppointment(thisRow.uuid)
        }
        return (
          <Button
            onClick={async () => {
              const result = await Confirm(MESSAGES.ALERT.CONFIRM_EXCLUDE, MESSAGES.ALERT.EXCLUDE_APPOINTMENT)
              if (result) {
                onClick()
              }
            }}
            variant="contained"
            color="secondary"
            title="delete">
            <DeleteForeverIcon/>
          </Button>
        )
      }
    }
  ]

  render () {
    const { classes } = this.props
    return (
      <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div style={{ height: 500, width: '100%' }}>
              <DataGrid disableColumnMenu={true} hideFooterSelectedRowCount={true} getRowId={(row) => row.uuid} rows={this.props.appointments} columns={this.columns} pageSize={10} />
            </div>
          </Paper>
      </Grid>
    )
  }
}

AppointmentsList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AppointmentsList)
