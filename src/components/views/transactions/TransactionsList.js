import React from 'react'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import SwipeOptions from '../../actions/SwipeOptions'
import { makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import amber from '@material-ui/core/colors/amber'

const theme = createMuiTheme();
const editColor = theme.palette.augmentColor(amber);

const useStyles = makeStyles({
  root: {
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
  edit: {
    backgroundColor: editColor.main,
    color: theme.palette.primary.contrastText,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  delete: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

function TransactionsList(props){
  const classes = useStyles();

  const [swiping, setSwiping] = React.useState(null);

  const itemRightOptions = [
    <div
      className={classes.edit}
      onClick={()=>console.log('edit')}
    >
      <EditIcon />
    </div>,
    <div
      className={classes.delete}
      onClick={()=>console.log('delete')}
    >
      <DeleteIcon />
    </div>
  ];

  return (
    <List className={classes.root}>
      {props.data.map(group => {
        return (
          <li key={group.number}>
            <ul className={classes.ul}>
              <Slide in={true} direction="right" mountOnEnter unmountOnExit>
                <ListSubheader className={[classes.subheader, classes.flexRow].join(' ')}>
                  <Typography variant='subtitle1'>{group.dateString}</Typography>
                  <Typography variant='subtitle1'>{group.symbol + group.total}</Typography>
                </ListSubheader>
              </Slide>
              {group.transactions.map(t => {
                return (
                  <Slide key={t.id} in={true} direction="right" mountOnEnter unmountOnExit>
                    <div>
                      <SwipeOptions
                        active={swiping == t.id}
                        onSwiping={()=>setSwiping(t.id)}
                        right={itemRightOptions}
                      >
                        <div className={classes.item} onClick={swiping === t.id ? null : ()=>setSwiping(null)}>
                          <Typography>
                            {t.description}
                          </Typography>
                          <div className={classes.itemRight}>
                            <Typography>{t.symbol}{t.amount}</Typography>
                            <Typography className={classes.currency}>{t.currency}</Typography>
                          </div>
                        </div>
                      </SwipeOptions>
                    </div>
                  </Slide>
                );
              })}
            </ul>
          </li>
        );
      })}
    </List>
  );
}

// <ListItem className={classes.item}>
//   <ListItemText
//     primary={t.description}
//     secondary={t.memo}
//   />
//   <ListItemSecondaryAction className={classes.flexRow}>
//     <Typography>{t.symbol}{t.amount}</Typography>
//     <Typography className={classes.currency}>{t.currency}</Typography>
//   </ListItemSecondaryAction>
// </ListItem>



export default TransactionsList;
