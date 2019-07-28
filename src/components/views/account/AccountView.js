import React from 'react'
import Slide from '@material-ui/core/Slide'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import FaceIcon from '@material-ui/icons/Face'
import EmailIcon from '@material-ui/icons/Email'
import KeyIcon from '@material-ui/icons/VpnKey'
import EditIcon from '@material-ui/icons/Edit'
import red from '@material-ui/core/colors/red'
// import CardActions from '@material-ui/core/CardActions'
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
  listIcon: {
    color: theme.palette.grey[400],
  },
  listIconCurrency: {
    fontSize: '1.5rem',
    height: 24,
    width: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    minHeight: theme.spacing(8),
    padding: theme.spacing(1,3),
  },
  listAction: {
    color: theme.palette.grey[500],
  },
  listValue: {
    color: theme.palette.grey[500],
    paddingRight: theme.spacing(1.5),
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

  // handlers
  function handleLogout() {
    props.logout();
  }

  return (
    <Slide in direction='right' mountOnEnter unmountOnExit>
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
          <AccountItem
            text={props.user.name}
            subtext='Name'
            withIcon
            icon={<FaceIcon/>}
            includeAction
            actionIcon={<EditIcon/>}
            onAction={()=>console.log('Edit name')} />
          <AccountItem
            text={props.user.email}
            subtext='Email'
            withIcon
            icon={<EmailIcon/>}
            includeAction
            actionIcon={<EditIcon/>}
            onAction={()=>console.log('Edit email')} />
          <AccountItem
            text={props.user.currency}
            subtext='Currency'
            withIcon
            icon={<div className={classes.listIconCurrency}>{CURRENCY[props.user.currency]}</div>}
            includeAction
            actionIcon={<EditIcon/>}
            onAction={()=>console.log('Edit currency')} />
          <AccountItem
            text='Change Password'
            withIcon
            icon={<KeyIcon/>}
            includeAction
            actionIcon={<EditIcon/>}
            onAction={()=>console.log('Change password')} />
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
  function AccountItem(props){
    return (
      <React.Fragment>
        <ListItem className={classes.listItem}>
          {props.withIcon && (
            <ListItemAvatar className={classes.listIcon}>{props.icon}</ListItemAvatar>
          )}
          <ListItemText primary={props.text} secondary={props.subtext} className={classes.listText} />
          {props.includeAction && (
            <ListItemSecondaryAction>
              <IconButton onClick={props.onAction} disabled={props.disableAction} className={classes.listAction}>
                {props.actionIcon}
              </IconButton>
            </ListItemSecondaryAction>
          )}
          {(props.onlyValue && !props.includeAction ) && (
            <ListItemSecondaryAction>
              <div className={classes.listValue}>{props.value}</div>
            </ListItemSecondaryAction>
          )}
        </ListItem>
        <Divider light />
      </React.Fragment>
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
        <Button onClick={handleLogout} variant='outlined' className={classes.logoutButton}>
          Logout
        </Button>
      </div>
    );
  }
}

export default AccountView;
