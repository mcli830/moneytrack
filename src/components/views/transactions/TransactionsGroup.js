import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme();
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    color: theme.palette.text.secondary
  },
});

export default (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant='body2'>
        {props.date}
      </Typography>
      <Typography variant='body2'>
        {props.total}
      </Typography>
    </div>
  );
}
