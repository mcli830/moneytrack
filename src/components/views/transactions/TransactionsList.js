import React from 'react'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import { makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme();

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
  },
  currency: {
    color: theme.palette.text.disabled,
    fontSize: theme.typography.subtitle2.fontSize,
    marginLeft: theme.spacing(1)
  }
});

// function renderList(){
//   if (Object.keys(props.data).length < 1) return <EmptyList />;
//   const output = [];
//   for (let [group, data] of Object.entries(props.data)){
//     output.push(
//       <TransactionsGroup
//         date={data.transactions[0].dateString}
//         total={data.total}
//         key={group}
//       />
//     );
//     output.push(
//       data.transactions.map(t => (
//         <TransactionsEntry data={t} key={t.id} />
//       ))
//     );
//   }
//   return output;
// }

function TransactionsList(props){
  const classes = useStyles();
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
                    <ListItem className={classes.item}>
                      <ListItemText
                        primary={t.description}
                      />
                      <ListItemSecondaryAction className={classes.flexRow}>
                        <Typography>{t.symbol}{t.amount}</Typography>
                        <Typography className={classes.currency}>{t.currency}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
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

export default TransactionsList;
