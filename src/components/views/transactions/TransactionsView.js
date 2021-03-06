import React from 'react'
import MonthViews from '../MonthViews'
import TransactionsList from './TransactionsList'

function TransactionsView(props) {

  return (
    <MonthViews
      data={props.data.enhanced.transactions}
      lastPage={props.lastPage}
      setPage={props.setPage}
      headers={props.data.enhanced.transactions.map(d => d.name)}
    >
      <TransactionsList updateTransactionModal={props.updateTransactionModal} />
    </MonthViews>
  );
}

export default TransactionsView;
