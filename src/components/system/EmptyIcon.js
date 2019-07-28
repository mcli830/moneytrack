import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  EmptyIcon: {
    height: theme.spacing(3),
    width: theme.spacing(3),
    borderRadius: '50%',
  }
}))

export default (props) => {
  const classes = useStyles(useTheme());
  return <div className={classes.EmptyIcon} />;
}
