import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  appHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontFamily: 'Lobster, serif',
    padding: '0.5em 0',
    textAlign: 'center',
  }
}))

function AppHeader(props) {
  const classes = useStyles(useTheme());
  return (
    <div className="Header">
      <Typography variant="h4" className={classes.appHeader}>
        MoneyTrack
      </Typography>
    </div>
  );
}

export default AppHeader;
