import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import DeleteForeverIcon from '@material-ui/icons/DeleteForeverOutlined'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import { FormContainer } from './../../components/FormContainer'
import { EditAppointmentForm } from './form'
import api from '../../services/api'
import styles from './style'

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
      .then((response) => {})
  } catch (err) {
    this.setState({ error: 'Não foi possivel obter todos os agendamentos' })
  }
}

export const AppointmentsList = ({ appointments }) => {
  const classes = useStyles()

  return (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                        <TableCell>Patient</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Observation</TableCell>
                        <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {appointments.map((row) => (
                        <TableRow key={row.uuid}>
                        <TableCell>{row.patient.name}</TableCell>
                        <TableCell>
                            {
                            new Intl.DateTimeFormat('pt-BR', {
                              year: 'numeric',
                              month: 'numeric',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric'
                            }).format(new Date(row.date))
                            }
                        </TableCell>
                        <TableCell align="right">{row.observation}
                        </TableCell>
                        <TableCell align="right">
                            <Button
                            variant="contained"
                            color="secondary"
                            title="delete">
                            <DeleteForeverIcon onClick={() => deleteAppointment(row.uuid)}/>
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Paper>
        </Grid>
  )
}
