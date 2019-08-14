import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { CURRENCY } from '../../../data/resolvers'
import { makeStyles } from '@material-ui/styles'
import { useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => {
  const greyBorder = `1px solid ${theme.palette.grey[200]}`;
  return {
    highlights: {
      width: '100%',
      padding: theme.spacing(2),
    },
    highlightsPaper: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      overflow: 'hidden',
    },
    highlightsItem: {
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
    highlightsValue: {
      margin: theme.spacing(1, 0, 0.5),
    },
  }
});

function SummaryHighlights(props){
  const classes = useStyles(useTheme());
  // getters
  function getCurrency(){
    return CURRENCY[props.user.currency];
  }
  function getPeakSpending(){
    return props.data.groups.map(g => g.total).reduce((a,b) => parseFloat(a) > parseFloat(b) ? a : b);
  }

  return (
    <div className={classes.highlights}>
      <Paper className={classes.highlightsPaper}>
        <span className={classes.highlightsItem}>
          <Typography variant='h5' className={classes.highlightsValue}>
            {resolveCurrency(props.data.total)}
          </Typography>
          <Typography variant='caption' color='textSecondary'>
            Month Total
          </Typography>
        </span>
        <span className={classes.highlightsItem}>
          <Typography variant='h5' className={classes.highlightsValue}>
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
    const currency = getCurrency();
    const str = typeof n === 'string' ? n : n.toFixed(currency.decimal);
    const i = str.indexOf('.');
    return currency.symbol + (
      i > -1 && str.slice(i+1) === '00'
      ? str.slice(0,i)
      : str
    );
  }
}

export default SummaryHighlights;
