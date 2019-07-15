import React from 'react'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import InputBase from '@material-ui/core/InputBase'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme();

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.grey[100],
    display: 'flex',
    flexDirection: 'column'
  },
  controls: {
    color: theme.palette.text.secondary,
  },
  data: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  icon: {
    marginLeft: theme.spacing(3),
    padding: 0,
  },
  iconEmpty: {
    height: theme.typography.h4.fontSize,
    width: theme.typography.h4.fontSize,
    borderRadius: '50%',
    border: `2px dotted ${theme.palette.text.secondary}`
  },
  amountWrapper: {
    marginRight: theme.spacing(3)
  },
  amount: {
    fontSize: theme.typography.h5.fontSize,
    color: theme.palette.text.primary,
    textAlign: 'right',
    padding: 0,
  },
  currency: {
    color: theme.palette.text.secondary
  }
});

export default (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.controls}>
        <Button onClick={props.closeModal}>
          <Typography variant='caption'>
            Cancel
          </Typography>
        </Button>
      </div>
      <div className={classes.data}>
        <ButtonBase disableRipple className={classes.icon}>
          {props.icon ? <Icon>props.icon</Icon> : <div className={classes.iconEmpty} />}
        </ButtonBase>
        <InputBase
          id='amount'
          value={props.amount === 0 ? '' : props.amount}
          onChange={props.changeAmount}
          type='number'
          className={classes.amountWrapper}
          inputProps={{
            className: classes.amount,
            placeholder: '0'
          }}
          endAdornment={
            <InputAdornment position='end' className={classes.currency}>
              {props.currency}
            </InputAdornment>
          }
        />
      </div>
    </div>
  );
}
