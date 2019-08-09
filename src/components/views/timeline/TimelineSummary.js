import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { CURRENCY, resolveCurrencyValue } from '../../../data/resolvers'
import { makeStyles } from '@material-ui/styles'
import { useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => {
  const greyBorder = `1px solid ${theme.palette.grey[200]}`;
  return {
    summary: {
      width: '100%',
      padding: theme.spacing(2),
    },
    summaryPaper: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      overflow: 'hidden',
    },
    summaryItem: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: theme.spacing(12),
      width: '50%',
      '&:first-child': {
        borderRight: greyBorder
      },
    },
    summaryValue: {
      margin: theme.spacing(1, 0, 0.5),
    },
  }
});

function TimelineSummary(props){
  const classes = useStyles(useTheme());

  const [currency, setCurrency] = React.useState(getCurrency());

  // getters
  function getCurrency(){
    return CURRENCY[props.user.currency];
  }
  function getMonthTotal(){
    return props.data.groups
      .map(g => g.transactions)
      .reduce((a,b) => a.concat(b), [])
      .reduce((a,b) => a + parseFloat(b.amount), 0);
  }
  function getPeakSpending(){
    return props.data.groups.map(g => g.total).reduce((a,b) => a > b ? a : b);
  }

  return (
    <div className={classes.summary}>
      <Paper className={classes.summaryPaper}>
        <span className={classes.summaryItem}>
          <Typography variant='h5' className={classes.summaryValue}>
            {resolveCurrency(getMonthTotal())}
          </Typography>
          <Typography variant='caption' color='textSecondary'>
            Month Total
          </Typography>
        </span>
        <span className={classes.summaryItem}>
          <Typography variant='h5' className={classes.summaryValue}>
            {resolveCurrency(getPeakSpending())}
          </Typography>
          <Typography variant='caption' color='textSecondary'>
            Peak Spending
          </Typography>
        </span>
      </Paper>
    </div>
  );

  // internal helpers
  function resolveCurrency(n, symbol = false){
    const str = typeof n === 'string' ? n : n.toFixed(currency.decimal);
    const i = str.indexOf('.');
    return currency.symbol + (
      i > -1 && str.slice(i+1) === '00'
      ? str.slice(0,i)
      : str
    );
  }
}

export default TimelineSummary;
