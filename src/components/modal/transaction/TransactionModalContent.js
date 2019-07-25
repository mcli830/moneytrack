import React from 'react'
import TextField from '@material-ui/core/TextField'
import Icon from '@material-ui/core/Icon'
import InputAdornment from '@material-ui/core/InputAdornment'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { makeStyles } from '@material-ui/styles'
import { useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 0,
    backgroundColor: theme.palette.background.paper,
    flex: '1 1 auto',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  field: {
    display: 'block',
    padding: theme.spacing(3),
  },
  fieldInput: {
    width: '100%',
    maxHeight: theme.spacing(15),
    alignItems: 'flex-start',
    overflowY: 'auto',
    position: 'relative',
  },
  fieldAdornment: {
    position: 'sticky',
    top: '50%',
    transform: 'translate(0, -50%)',
    marginRight: theme.spacing(2)
  }
}));

export default (props) => {
  const classes = useStyles(useTheme());

  return (
    <div className={classes.root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          id='date'
          value={props.date.value}
          onChange={props.date.hanlder}
          className={classes.field}
          InputProps={{
            disableUnderline: true,
            className: classes.fieldInput,
            startAdornment: (
              <InputAdornment
                position='start'
                className={classes.fieldAdornment}
              >
                <Icon color={props.crudColor}>today</Icon>
              </InputAdornment>
            )
          }}
        />
      </MuiPickersUtilsProvider>
      <TextField
        id='description'
        className={classes.field}
        value={props.description.value}
        onChange={props.description.handler}
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
              <Icon color={props.description.valid() ? props.crudColor : 'disabled'}>label</Icon>
            </InputAdornment>
          )
        }}
      />
      <TextField
        id='memo'
        className={classes.field}
        value={props.memo.value}
        onChange={props.memo.handler}
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
              <Icon color={props.memo.valid() ? props.crudColor : 'disabled'}>create</Icon>
            </InputAdornment>
          )
        }}
      />
      {props.crud === 'update' && props.deleteButton}
    </div>
  );
}
