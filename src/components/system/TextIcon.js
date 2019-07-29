import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  TextIcon: {
    fontSize: '1.5rem',
    height: theme.spacing(3),
    width: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
  }
}))

export default (props) => {
  const classes = useStyles(useTheme());
  return <div className={classes.TextIcon}>{props.icon}</div>;
}
