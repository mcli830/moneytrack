import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme();

const rootStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    padding: theme.spacing(2)
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    left: '50%',
    transform: 'translate(-50%, 0)'
  }
});

const partitionStyles = makeStyles({
  datePartition: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    color: theme.palette.text.secondary
  },
});

const transactionStyles = makeStyles({
  transaction: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  amountWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  amount: {
    color: theme.palette.text.primary
  },
  currency: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary,
  }
});

function DateGroup(props){
  const classes = partitionStyles();
  return (
    <div className={classes.datePartition}>
      <Typography variant='body2'>
        {props.date}
      </Typography>
      <Typography variant='body2'>
        {props.total}
      </Typography>
    </div>
  );
}

function Transaction(props){
  const classes = transactionStyles();
  return (
    <div className={classes.transaction}>
      <Typography variant='body1' className={classes.text1}>
        {props.data.description}
      </Typography>
      <div className={classes.amountWrapper}>
        <Typography variant='body1' className={classes.amount}>
          {props.data.symbol}{props.data.amount}
        </Typography>
        <Typography variant='body2' className={classes.currency}>
          {props.data.currency}
        </Typography>
      </div>
    </div>
  )
}

export default (props) => {
  const classes = rootStyles();

  function renderList(){
    const output = [];
    for (let [group, data] of Object.entries(props.data)){
      output.push(<DateGroup date={data.transactions[0].dateString} total={data.total} key={group} />);
      output.push(data.transactions.map(t => <Transaction data={t} key={t.id} />));
    }
    return output;
  }

  return (
    <React.Fragment>
      {renderList()}
      <Fab className={classes.fab} color='primary'>
        <Icon>add</Icon>
      </Fab>
    </React.Fragment>
  );
}
