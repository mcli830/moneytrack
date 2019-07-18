import React from 'react'
import { withApollo } from 'react-apollo'
import TransactionsView from './TransactionsView'
import currency from '../../../data/currency'

function Transactions(props) {
  // prepare data for rendering
  const groupData = formatData();

  return (
    <TransactionsView
      user={props.data.user}
      data={groupData}
    />
  );

  //////////////////
  // helpers
  //////////////////
  function getDateString(date){
    return date.toDateString().replace(/\w+\s(\w+)(\s\w+)(\s\w+)/, '$1$2,$3');
  }
  function formatData(){
    const groups = {};
    props.data.user.transactions.forEach(t => {
      t.date = new Date(t.date);
      t.dateString = getDateString(t.date);
      t.group = t.date.getUTCDate();
      t.currency = props.data.user.currency;
      t.symbol = currency[props.data.user.currency];
      if (!groups[t.group]) groups[t.group] = {
        number: t.group,
        date: t.date,
        dateString: t.dateString,
        symbol: t.symbol,
        transactions: []
      };
      groups[t.group].transactions.push(t);
    });
    return Object.keys(groups).map(k => ({
      ...groups[k],
      total: groups[k].transactions.reduce((a,b)=>a+b.amount, 0)
    }));
  }
}

export default withApollo(Transactions);
