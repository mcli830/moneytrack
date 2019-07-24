import React from 'react'
import TextField from '@material-ui/core/TextField'
import Icon from '@material-ui/core/Icon'
import InputAdornment from '@material-ui/core/InputAdornment'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import { makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme();

const useStyles = makeStyles({
  root: {
    borderRadius: 0,
    backgroundColor: theme.palette.background.paper,
    flex: '1 1 auto'
  },
  field: {
    display: 'block',
    padding: theme.spacing(3)
  },
  fieldInput: {
    width: '100%',
  },
  fieldAdornment: {
    marginRight: theme.spacing(2)
  }
})

export default (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          id='date'
          value={props.date}
          onChange={props.changeDate}
          className={classes.field}
          InputProps={{
            disableUnderline: true,
            className: classes.fieldInput,
            startAdornment: (
              <InputAdornment
                position='start'
                className={classes.fieldAdornment}
              >
                <Icon color='primary'>today</Icon>
              </InputAdornment>
            )
          }}
        />
      </MuiPickersUtilsProvider>
      <TextField
        id='description'
        className={classes.field}
        value={props.description}
        onChange={props.changeDescription}
        multiline
        InputProps={{
          className: classes.fieldInput,
          placeholder: 'Write a description...',
          disableUnderline: true,
          startAdornment: (
            <InputAdornment
              position='start'
              className={classes.fieldAdornment}
            >
              <Icon color={props.validDescription() ? 'primary' : 'disabled'}>label</Icon>
            </InputAdornment>
          )
        }}
      />
      <TextField
        id='memo'
        className={classes.field}
        value={props.memo}
        onChange={props.changeMemo}
        multiline
        InputProps={{
          className: classes.fieldInput,
          placeholder: 'Add a memo...',
          disableUnderline: true,
          startAdornment: (
            <InputAdornment
              position='start'
              className={classes.fieldAdornment}
            >
              <Icon color={props.validMemo() ? 'primary' : 'disabled'}>create</Icon>
            </InputAdornment>
          )
        }}
      />
      {props.crud === 'update' && props.deleteButton}
    </div>
  );
}
