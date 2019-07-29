import React from 'react'
import Slide from '@material-ui/core/Slide'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import FaceIcon from '@material-ui/icons/Face'
import EmailIcon from '@material-ui/icons/Email'
import KeyIcon from '@material-ui/icons/VpnKey'
import EditIcon from '@material-ui/icons/Edit'
import AccountItem from './AccountItem'
import CrudFormUpdateUser from '../../crud/CrudFormUpdateUser'
import TextIcon from '../../system/TextIcon'
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
  deleteButton: {
    marginTop: theme.spacing(2),
    color: theme.palette.error.light,
    borderColor: theme.palette.error.light,
    '&:hover':{
      color: theme.palette.common.white,
      backgroundColor: theme.palette.error.light,
    }
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
            value={CURRENCY[props.user.currency] + props.stats.total} />
          <AccountItem
            text='Average monthly expenses'
            onlyValue
            value={CURRENCY[props.user.currency] + props.stats.monthly} />
          <AccountItem
            text='Average weekly expenses'
            onlyValue
            value={CURRENCY[props.user.currency] + props.stats.weekly} />
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
          />
          <CrudFormUpdateUser
            user={props.user}
            name={'email'}
            icon={<EmailIcon/>}
            value={props.user.email}
          />
          <CrudFormUpdateUser
            user={props.user}
            name={'currency'}
            icon={<TextIcon icon={CURRENCY[props.user.currency]} />}
            value={props.user.currency}
          />
          <LogoutButton />
          <Header text='Danger Zone' />
          <DeleteButton red text='Delete all transactions' handler={()=>console.log('delete transactions')} />
          <DeleteButton red text='Delete Account' handler={()=>console.log('delete account')} />
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
  function DeleteButton(props){
    return (
      <div className={classes.listItemCentered}>
        <Button variant='outlined' onClick={props.handler} className={classes.deleteButton}>
          {props.text}
        </Button>
      </div>
    );
  }
  function LogoutButton(){
    return (
      <div className={classes.listItemCentered + ' ' + classes.padded}>
        <Button onClick={props.handleLogout} variant='outlined' className={classes.logoutButton}>
          Logout
        </Button>
      </div>
    );
  }
}

export default AccountView;
