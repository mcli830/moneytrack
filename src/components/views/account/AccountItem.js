import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import { useTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme =>({
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
}))

export default function AccountItem(props){
  const classes = useStyles(useTheme());
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
