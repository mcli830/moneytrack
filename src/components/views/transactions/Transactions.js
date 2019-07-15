import React from 'react'
import { graphql } from 'react-apollo'
import TransactionsView from './TransactionsView'
import currency from '../../../data/currency'

import CREATE_TRANSACTION_MUTATION from '../../../graphql/mutations/CreateTransaction'

function Transactions(props) {

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
    if (!groups[t.group]) groups[t.group] = {
      transactions: []
    };
    groups[t.group].transactions.push(t);
  });

  for (let [key, val] of Object.entries(groups)){
    val.total = val.transactions[0].symbol + val.transactions.reduce((a,b)=>a+b.amount, 0);
  }

  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => {
    setModalOpen(true)
  }
  const handleModalClose = () => {
    setModalOpen(false)
  }

  return (
    <TransactionsView
      data={groups}
      modal={{
        open: modalOpen,
        handleOpen: handleModalOpen,
        handleClose: handleModalClose
      }}
      createTransaction={props.createTransactionMutation}
    />
  )
}

export default graphql(
  CREATE_TRANSACTION_MUTATION,
  { name: 'createTransactionMutation' }
)(Transactions);
