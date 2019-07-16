import React from 'react'
import { withApollo } from 'react-apollo'
import TransactionsView from './TransactionsView'
import currency from '../../../data/currency'

import { LOGGED_IN_USER } from '../../../graphql/queries'
import { GET_USER_DATA } from '../../../graphql/queries'

function Transactions(props) {
  // get user data from apollo cache
  const { loggedInUser } = props.client.cache.readQuery({
    query: LOGGED_IN_USER
  })
  const { User } = props.client.cache.readQuery({
    query: GET_USER_DATA,
    variables: { id: loggedInUser.id }
  });
  // format transaction data into date groups for rendering
  const groups = {};
  User.transactions.forEach(t => {
    t.date = new Date(t.date);
    t.dateString = getDateString(t.date);
    t.group = t.date.getUTCDate();
    t.symbol = currency[User.currency];
    if (!groups[t.group]) groups[t.group] = {
      transactions: []
    };
    groups[t.group].transactions.push(t);
  });
  // calculate sums for transaction date groups
  for (let [_, val] of Object.entries(groups)){
    val.total = val.transactions[0].symbol + val.transactions.reduce((a,b)=>a+b.amount, 0);
  }

  // transactions view state
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => {
    setModalOpen(true)
  }
  const handleModalClose = () => {
    setModalOpen(false)
  }

  return (
    <TransactionsView
      user={User}
      data={groups}
      modal={{
        open: modalOpen,
        handleOpen: handleModalOpen,
        handleClose: handleModalClose
      }}
      createTransaction={props.createTransactionMutation}
    />
  );

  // helper
  function getDateString(date){
    return date.toDateString().replace(/\w+\s(\w+)(\s\w+)(\s\w+)/, '$1$2,$3');
  }
}

export default withApollo(Transactions);
