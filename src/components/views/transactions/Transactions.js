import React from 'react'
import { withApollo } from 'react-apollo'
import TransactionsView from './TransactionsView'

function Transactions(props) {

  const lastPage = props.lastPage !== null ? props.lastPage : props.data.enhanced.initialView;

  return (
    <TransactionsView
      data={props.data}
      lastPage={lastPage}
      setPage={props.setPage}
      updateTransactionModal={props.updateTransactionModal}
    />
  );
}

export default withApollo(Transactions);
