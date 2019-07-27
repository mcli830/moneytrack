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
import IconButton from '@material-ui/core/IconButton'
import FaceIcon from '@material-ui/icons/Face'
import EmailIcon from '@material-ui/icons/Email'
import EditIcon from '@material-ui/icons/Edit'
// import CardActions from '@material-ui/core/CardActions'
import { makeStyles } from '@material-ui/styles'
import { useTheme } from '@material-ui/core/styles'
import { CURRENCY } from '../../../data/resolvers'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    padding: theme.spacing(0,1),
    '& *': {
      listStyle: 'none',
    }
  },
  list: {
    padding: 0,
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
    padding: theme.spacing(1,2),
  },
  listAction: {
    color: theme.palette.grey[500],
  },
  listValue: {
    color: theme.palette.grey[500],
    paddingRight: theme.spacing(1.5),
  }
}))

function AccountView(props) {
  const classes = useStyles(useTheme());
  return (
    <Slide in direction='right' mountOnEnter unmountOnExit>
      <Container maxWidth='sm' className={classes.root}>
        <List className={classes.list}>
          <AccountItem
            text={props.user.name}
            withIcon
            icon={<FaceIcon/>}
            includeAction
            actionIcon={<EditIcon/>}
            onAction={()=>console.log('Edit name')} />
          <AccountItem
            text={props.user.email}
            withIcon
            icon={<EmailIcon/>}
            includeAction
            actionIcon={<EditIcon/>}
            onAction={()=>console.log('Edit email')} />
          <AccountItem
            text={props.user.currency}
            withIcon
            icon={<div className={classes.listIconCurrency}>{CURRENCY[props.user.currency]}</div>}
            includeAction
            actionIcon={<EditIcon/>}
            onAction={()=>console.log('Edit currency')} />
          <AccountItem
            text='Number of Transactions'
            onlyValue
            value={props.user.transactions.length} />
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
        </List>
      </Container>
    </Slide>
  );

  // internal render helper
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
}

export default AccountView;
