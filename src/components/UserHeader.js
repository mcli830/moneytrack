import React from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AccountIcon from '@material-ui/icons/AccountCircle'

const theme = createMuiTheme();

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  header: {
    color: theme.palette.background.default,
    fontFamily: 'Kaushan Script, sans-serif',
    padding: '0.5em 0',
    textAlign: 'center',
  },
  text: {
    color: theme.palette.background.default,
    padding: '0.5em 0',
    textAlign: 'center',
  },
  account: {
    color: theme.palette.background.default
  }
})

function capitalize(str){
  return str[0].toUpperCase() + str.slice(1);
}

function UserHeader(props) {
  const classes = useStyles();
  return props.history.location.pathname !== '/' && (
    <div className={classes.root}>
      <Container maxWidth='md' className={classes.container}>
        <Button>
          <AccountIcon className={classes.account} />
        </Button>
        <Typography variant="h4" className={classes.header}>
          {capitalize(props.history.location.pathname.slice(1))}
        </Typography>
        <Button onClick={()=>props.logout()}>
          <Typography variant="button" className={classes.text}>
            Logout
          </Typography>
        </Button>
      </Container>
    </div>
  );
}

export default withRouter(UserHeader);
