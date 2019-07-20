import React from 'react'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
// import EditIcon from '@material-ui/icons/Edit'
// import DeleteIcon from '@material-ui/icons/Delete'
import TransactionsListTop from './TransactionsListTop'
import { makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
// import amber from '@material-ui/core/colors/amber'
// import red from '@material-ui/core/colors/red'

const theme = createMuiTheme();
// const editColor = theme.palette.augmentColor(amber);
// const deleteColor = theme.palette.augmentColor(red);

const useStyles = makeStyles({
  root: {
    flex: '1 1 auto',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  list: {
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
  // edit: {
  //   backgroundColor: editColor[400],
  //   color: theme.palette.primary.contrastText,
  //   '&:hover': {
  //     backgroundColor: editColor[600],
  //     cursor: 'pointer',
  //   }
  // },
  // delete: {
  //   backgroundColor: deleteColor[400],
  //   color: theme.palette.error.contrastText,
  //   '&:hover': {
  //     backgroundColor: deleteColor[600],
  //     cursor: 'pointer',
  //   }
  // }
});

function TransactionsList(props){
  const classes = useStyles();

  // const [swiping, setSwiping] = React.useState(null);

  // const itemRightOptions = [
  //   <div className={classes.option}>
  //     <div className={classes.edit} onClick={()=>console.log('edit')}>
  //       <EditIcon />
  //     </div>
  //   </div>,
  //   <div className={classes.option}>
  //     <div className={classes.delete} onClick={()=>console.log('delete')}>
  //       <DeleteIcon />
  //     </div>
  //   </div>
  // ];
  // const listItemOnClick = swiping === t.id ? null : () => setSwiping(null);

  return (
    <React.Fragment>
      <TransactionsListTop />
      <div className={classes.root}>
        <List className={classes.list}>
          {props.data.map(group => {
            return (
              <li key={group.number}>
                <ul className={classes.ul}>
                  <Slide in direction="right" mountOnEnter unmountOnExit>
                    <ListSubheader className={[classes.subheader, classes.flexRow].join(' ')}>
                      <Typography variant='subtitle1'>{group.dateString}</Typography>
                      <Typography variant='subtitle1'>{group.symbol + group.total}</Typography>
                    </ListSubheader>
                  </Slide>
                  {group.transactions.map(t => {
                    return (
                      <Slide key={t.id} in direction="right" mountOnEnter unmountOnExit>
                        <li>
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
                      </Slide>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </List>
      </div>
    </React.Fragment>
  );
}

// <SwipeOptions
//   disabled={swiping !== t.id}
//   onSwiping={()=>setSwiping(t.id)}
//   right={itemRightOptions}
//   unitSize={60}
//   pressable
// >


export default TransactionsList;
