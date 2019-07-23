import React from 'react'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import EmptyList from './EmptyList'
import { makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme();

const useStyles = makeStyles({
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
    fontSize: theme.typography.subtitle2.fontSize,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  item: {
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    borderRight: `1px solid ${theme.palette.grey[100]}`,
    position: 'relative',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemRight: {
    display: 'inline-block',
    width: 'auto',
    '& > *': {
      display: 'inline-block',
    }
  },
  currency: {
    color: theme.palette.text.disabled,
    fontSize: theme.typography.subtitle2.fontSize,
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
});

function TransactionsList(props){
  const classes = useStyles();

  const renderList = () => props.data.map(group => (
    <li key={group.id}>
      <ul className={classes.ul}>
          <ListSubheader className={[classes.subheader, classes.flexRow].join(' ')}>
            <Typography variant='subtitle1'>{group.dateString}</Typography>
            <Typography variant='subtitle1'>{group.symbol + group.total}</Typography>
        </ListSubheader>
        {group.transactions.map((t,i) => (
          <li key={i}>
            <div className={classes.item}>
              <Typography>
                {t.description}
              </Typography>
              <div className={classes.itemRight}>
                <Typography>{t.symbol}{t.amount}</Typography>
                <Typography className={classes.currency}>{t.currency}</Typography>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </li>
  ));

  return (
    <List className={classes.list}>
      {
        props.data.length < 1
        ? <EmptyList />
        : renderList()
      }
    </List>
  );
}

export default TransactionsList;
