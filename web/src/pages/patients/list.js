import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import { DataGrid, CellParams, GridApi } from '@material-ui/data-grid'
import Paper from '@material-ui/core/Paper'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'

import styles from './style'
import MESSAGES from '../../services/messages'

class PatientsList extends Component {
  patientDetails (patientUuid) {
    this.props.history.push({ pathname: '/patients/'.concat(patientUuid) })
  }

  columns = [
    { field: 'uuid', hide: true },
    { field: 'name', flex: 2, headerName: MESSAGES.LABEL.FIRSTNAME },
    { field: 'phone', flex: 2, headerName: MESSAGES.LABEL.PHONE },
    { field: 'birthday', flex: 2, headerName: MESSAGES.LABEL.BIRTHDAY },
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
          return this.patientDetails(thisRow.uuid)
        }
        return (
          <Button
            onClick={onClick}
            variant="contained"
            color="primary"
            title="more">
            <EditIcon/>
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
              <DataGrid disableColumnMenu={true} hideFooterSelectedRowCount={true} getRowId={(row) => row.uuid} rows={this.props.patients} columns={this.columns} pageSize={10} />
            </div>
          </Paper>
      </Grid>
    )
  }
}

PatientsList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PatientsList)
