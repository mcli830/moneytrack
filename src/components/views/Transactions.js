import React from 'react'
import TransactionsView from './TransactionsView'
import currency from '../../data/currency'

export default (props) => {

  function getDateString(date){
    return date.toDateString().replace(/\w+\s(\w+)(\s\w+)(\s\w+)/, '$1$2,$3');
  }

  const groups = {};

  const transactions = props.user.transactions;
  transactions.forEach(t => {
    t.date = new Date(t.date);
    t.dateString = getDateString(t.date);
    t.group = t.date.getUTCDate();
    t.symbol = currency[t.currency];
    if (!groups[t.group]) groups[t.group] = [t];
    else groups[t.group].push(t);
  });

  return (
    <TransactionsView
      data={groups}
    />
  )
}
