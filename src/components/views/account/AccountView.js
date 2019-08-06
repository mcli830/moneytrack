import React from 'react'
import Slide from '@material-ui/core/Slide'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import FaceIcon from '@material-ui/icons/Face'
import EmailIcon from '@material-ui/icons/Email'
import AccountItem from './AccountItem'
import CrudFormUpdateUser from '../../crud/CrudFormUpdateUser'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/styles'
import { useTheme } from '@material-ui/core/styles'
import { CURRENCY } from '../../../data/resolvers'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    maxHeight: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: theme.spacing(0,0,4,0),
    '& *': {
      listStyle: 'none',
    }
  },
  list: {
    padding: 0,
  },
  listHeader: {
    display: 'block',
    padding: theme.spacing(0.25,3,0,3),
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.text.secondary,
  },
  listItemCentered: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  padded: {
    padding: theme.spacing(3,0,3,0)
  }
}))

function AccountView(props) {
  const classes = useStyles(useTheme());

  return (
    <Slide in={props.slide.in} timeout={props.slide.timeout} direction='right' mountOnEnter unmountOnExit>
      <Container maxWidth='sm' className={classes.root}>
        <List className={classes.list}>
          <Header text='Statistics' />
          <AccountItem
            text='Total Expenses'
            onlyValue
            value={CURRENCY[props.user.currency].symbol + props.stats.total} />
          <AccountItem
            text='Average monthly expenses'
            onlyValue
            value={CURRENCY[props.user.currency].symbol + props.stats.monthly} />
          <AccountItem
            text='Average weekly expenses'
            onlyValue
            value={CURRENCY[props.user.currency].symbol + props.stats.weekly} />
          <AccountItem
            text='Number of Transactions'
            onlyValue
            value={props.user.transactions.length} />
          <Header text='Manage Account' />
          <CrudFormUpdateUser
            user={props.user}
            name={'name'}
            icon={<FaceIcon/>}
            value={props.user.name}
            alerts={props.alerts}
          />
          <CrudFormUpdateUser
            user={props.user}
            name={'email'}
            icon={<EmailIcon/>}
            value={props.user.email}
            alerts={props.alerts}
          />
          <CrudFormUpdateUser
            user={props.user}
            select
            options={Object.values(CURRENCY).map(attr=>({value: attr.abbr, label: `${attr.name} (${attr.symbol})` }))}
            name={'currency'}
            textIcon
            icon={CURRENCY[props.user.currency].icon}
            value={props.user.currency}
            alerts={props.alerts}
          />
          <LogoutButton />
        </List>
      </Container>
    </Slide>
  );

  // internal render helper
  function Header(props){
    return (
      <Typography variant='overline' className={classes.listHeader}>
        {props.text}
      </Typography>
    );
  }
  function LogoutButton(){
    return (
      <div className={classes.listItemCentered + ' ' + classes.padded}>
        <Button
          onClick={()=>{
            props.alerts.notification({
              message: 'Logging out...',
              color: 'primary',
              icon: <CircularProgress size={16} />
            });
            props.logout();
          }}
          variant='outlined'
          className={classes.logoutButton}
        >
          Logout
        </Button>
      </div>
    );
  }
}

export default AccountView;
