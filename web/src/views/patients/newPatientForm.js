import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export const PatientForm = ({ onSubmit }) => {
  const classes = useStyles()
  const [gender, setGender] = useState('')
  const handleChange = (event) => {
    setGender(event.target.value)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <form onSubmit={onSubmit} className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="phone"
          label="Phone Number"
          name="phone"
          autoComplete="phone"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="birthday"
          label="Birthday"
          name="birthday"
          autoComplete="birthday"
          type="date"
          autoFocus
        />
        <FormControl
          fullWidth
          variant="outlined"
          className={classes.formControl}
          >
          <InputLabel required htmlFor="gender">Gender</InputLabel>
          <Select
            native
            required
            value={gender}
            onChange={handleChange}
            inputProps={{
              name: 'gender',
              id: 'gender'
            }}
          >
            <option value={'male'}>male</option>
            <option value={'female'}>female</option>
          </Select>
        </FormControl>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="height"
          label="height"
          name="height"
          autoComplete="height"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="weight"
          label="weight"
          name="weight"
          autoComplete="weight"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Create
        </Button>
      </form>
    </div>
  )
}
export default PatientForm
