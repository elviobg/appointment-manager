import React from 'react'

import Grid from '@material-ui/core/Grid'
import { DataGrid, CellParams, GridApi } from '@material-ui/data-grid'
import Paper from '@material-ui/core/Paper'
import DeleteForeverIcon from '@material-ui/icons/DeleteForeverOutlined'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import api from '../../services/api'
import MESSAGES from '../../services/messages'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  }
}))

async function deleteAppointment (uuid) {
  try {
    await api.delete('/appointments/'.concat(uuid))
  } catch (err) {
    this.setState({ error: MESSAGES.ERROR.DB_CONNECTION })
  }
}

export const AppointmentsList = ({ appointments, hidePatientColumn }) => {
  const classes = useStyles()

  const columns = [
    { field: 'uuid', hide: true },
    {
      field: 'patient',
      hide: hidePatientColumn,
      flex: 3,
      headerName: MESSAGES.LABEL.PATIENT,
      valueGetter: (params) => {
        console.log(params.row.patient.name)
        return params.row.patient.name
      }
    },
    { field: 'date', flex: 2, headerName: MESSAGES.LABEL.DATE },
    { field: 'observation', flex: 4, headerName: MESSAGES.ERROR.OBSERVATION },
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
          return deleteAppointment(thisRow.uuid)
        }
        return (
          <Button
            onClick={onClick}
            variant="contained"
            color="secondary"
            title="delete">
            <DeleteForeverIcon/>
          </Button>
        )
      }
    }
  ]

  return (
    <Grid item xs={12}>
        <Paper className={classes.paper}>
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid disableColumnMenu={true} hideFooterSelectedRowCount={true} getRowId={(row) => row.uuid} rows={appointments} columns={columns} pageSize={10} />
          </div>
        </Paper>
    </Grid>
  )
}
