import React from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { useTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import SettingsIcon from '@material-ui/icons/Settings'

const useStyles = makeStyles(theme => ({
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
  button: {
    borderRadius: '50%',
    width: 'auto',
    height: 'auto',
    padding: theme.spacing(2),
  },
  icon: {
    color: theme.palette.background.default
  }
}));

function capitalize(str){
  return str[0].toUpperCase() + str.slice(1);
}

function UserHeader(props) {
  const classes = useStyles(useTheme());
  return props.history.location.pathname !== '/' && (
    <div className={classes.root}>
      <Container maxWidth='sm' className={classes.container}>
        <Button onClick={props.logout} className={classes.button}>
          <SettingsIcon className={classes.icon} />
        </Button>
        <Typography variant="h4" className={classes.header}>
          {capitalize(props.history.location.pathname.slice(1))}
        </Typography>
        <Button onClick={props.openTransactionModal} className={classes.button}>
          <AddIcon className={classes.icon} />
        </Button>
      </Container>
    </div>
  );
}

export default withRouter(UserHeader);
