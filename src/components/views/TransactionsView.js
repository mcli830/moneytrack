import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme();

const rootStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    padding: theme.spacing(2)
  }
});

const partitionStyles = makeStyles({
  datePartition: {
    display: 'flex',
    flexDirection: 'row',
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

  function renderList(){
    const output = [];
    for (let group in props.data){
      let transactions = props.data[group];
      // push DateGroup component
      output.push(<DateGroup date={transactions[0].dateString} key={transactions[0].group} />);
      // push Transaction components array
      output.push(transactions.map(t => <Transaction data={t} key={t.id} />));
    }
    return output;
  }

  return (
    <React.Fragment>
      {renderList()}
    </React.Fragment>
  );
}
