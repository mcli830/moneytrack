import React from 'react'
import TransactionsView from './TransactionsView'
import currency from '../../data/currency'

export default (props) => {

  const transactions = props.user.transactions.slice();
  transactions.forEach(t => {
    t.date = getDateString(new Date(t.date));
    t.symbol = currency[t.currency]
  })

  function getDateString(date){
    return date.toDateString().replace(/^\w+\s/, '');
  }

  return (
    <TransactionsView
      user={props.user}
      transactions={transactions}
    />
  )
}
