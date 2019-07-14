import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme();

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  amountWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  amount: {
    color: theme.palette.text.primary
  },
  currency: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary,
  }
});

export default (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant='body1' className={classes.text1}>
        {props.data.description}
      </Typography>
      <div className={classes.amountWrapper}>
        <Typography variant='body1' className={classes.amount}>
          {props.data.symbol}{props.data.amount}
        </Typography>
        <Typography variant='body2' className={classes.currency}>
          {props.data.currency}
        </Typography>
      </div>
    </div>
  )
}
