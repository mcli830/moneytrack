import React from 'react'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Icon from '@material-ui/core/Icon'
import ButtonBase from '@material-ui/core/ButtonBase'
import Divider from '@material-ui/core/Divider'
import EmptyList from '../EmptyList'
import { makeStyles } from '@material-ui/styles'
import { withTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  list: {
    height: '100%',
    maxHeight: '100%',
    overflowX: 'hidden',
    overflowY: 'scroll',
    padding: 0,
  },
  ul: {
    padding: 0,
    listStyle: 'none',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subheader: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.grey[500],
    fontSize: theme.typography.subtitle2.fontSize,
    padding: theme.spacing(0.5,2,0,2),
  },
  listItemWrapper: {
    width: '100%',
  },
  listItem: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  listItemIconWrapper: {
    borderRadius: '50%',
    height: theme.spacing(5),
    width: theme.spacing(5),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemIcon: {
    borderRadius: '50%',
    color: '#fff',
  },
  listItemSecondary: {
    right: theme.spacing(2),
  },
  iconEmpty: {
    height: theme.typography.h4.fontSize,
    width: theme.typography.h4.fontSize,
    borderRadius: '50%',
    border: `2px dotted ${theme.palette.grey[200]}`
  },
  currencyNum: {
    fontSize: 14,
  },
  currency: {
    color: theme.palette.text.disabled,
    marginLeft: theme.spacing(0.5)
  },
  option: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    '& > *': {
      width: 50,
      height: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      userSelect: 'none',
      transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeOut}`,
      '&:active': {
        transform: 'scale(1.1)'
      }
    }
  },
}));

function TransactionsList(props){
  const classes = useStyles(props.theme);

  const renderList = () => props.data.groups.map(group => (
      <li key={group.id}>
        <ul className={classes.ul}>
          <ListSubheader className={[classes.subheader, classes.flexRow].join(' ')}>
            <Typography variant='overline'>{group.dateString}</Typography>
            <Typography variant='overline'>{group.symbol + group.total}</Typography>
          </ListSubheader>
          {group.transactions.map((t,i) => (
            <li key={i}>
              <ButtonBase
                onClick={()=>props.updateTransactionModal(t.id)}
                className={classes.listItemWrapper}
                >
                <ListItem dense alignItems='center' classes={{container: classes.listItem}}>
                  <ListItemAvatar className={classes.listItemAvatar}>
                    {t.category ? (
                      <div style={{backgroundColor: t.category.mui.color}} className={classes.listItemIconWrapper}>
                        <Icon className={classes.listItemIcon}>{t.category.mui.icon}</Icon>
                      </div>
                    ) : <div className={classes.iconEmpty} />}
                  </ListItemAvatar>
                  <ListItemText primary={t.description} secondary={t.note} />
                  <ListItemSecondaryAction className={classes.listItemSecondary}>
                    <Typography variant='subtitle1' component='span' className={classes.currencyNum}>
                      {t.symbol}{t.amountDisplay}
                    </Typography>
                    <Typography variant='caption' component='span' className={classes.currency}>
                      {t.currency}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              </ButtonBase>
              <Divider light />
            </li>
          ))}
        </ul>
      </li>
  ));

  return (
    <List className={classes.list}>
      {props.data.length < 1 ? <EmptyList /> : renderList()}
    </List>
  );
}

export default withTheme(TransactionsList);
