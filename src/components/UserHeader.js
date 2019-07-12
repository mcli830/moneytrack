import React from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const defaultTheme = createMuiTheme();

const useStyles = makeStyles({
  root: {
    backgroundColor: defaultTheme.palette.primary.main,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  header: {
    color: defaultTheme.palette.background.default,
    fontFamily: 'Lobster, serif',
    padding: '0.5em 0',
    textAlign: 'center',
  },
  text: {
    color: defaultTheme.palette.background.default,
    padding: '0.5em 0',
    textAlign: 'center',
  }
})

function capitalize(str){
  return str[0].toUpperCase() + str.slice(1);
}

function UserHeader(props) {
  const classes = useStyles();
  return props.history.location.pathname !== '/' && (
    <div className={classes.root}>
      <Button>
        <Typography variant="button" className={classes.text}>
          n/a
        </Typography>
      </Button>
      <Typography variant="h4" className={classes.header}>
        {capitalize(props.history.location.pathname.slice(1))}
      </Typography>
      <Button onClick={()=>props.logout()}>
        <Typography variant="button" className={classes.text}>
          Logout
        </Typography>
      </Button>
    </div>
  );
}

export default withRouter(UserHeader);
