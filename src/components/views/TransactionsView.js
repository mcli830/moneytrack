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

function DatePartition(props){
  const classes = partitionStyles();
  return (
    <div className={classes.datePartition}>
      <Typography variant='body2'>
        {props.date.toDateString().replace(/^\w+\s/, '')}
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
    var date = null;
    return props.transactions.map(data => {
      const renderNext = [<Transaction data={data} key={data.id} />];
      const transactionDate = new Date(data.date);
      if (date === null || transactionDate > date ){
        date = transactionDate;
        renderNext.unshift(<DatePartition date={date} />);
      }
      return renderNext;
    });
  }

  return (
    <React.Fragment>
      {renderList()}
    </React.Fragment>
  )
}
