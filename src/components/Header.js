import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const defaultTheme = createMuiTheme();

const useStyles = makeStyles({
  root: {
    backgroundColor: defaultTheme.palette.primary.main,
    color: defaultTheme.palette.background.default,
    fontFamily: 'Lobster, serif',
    padding: '0.5em 0',
    textAlign: 'center',
  }
})

export default function Header(props) {
  const classes = useStyles();
  return (
    <div className="Header">
      <Typography variant="h4" className={classes.root}>
        MoneyTrack
      </Typography>
    </div>
  );
}
