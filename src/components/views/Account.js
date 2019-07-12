import React from 'react'
import AccountView from './AccountView'

export default (props) => {

  console.log(props.user.transactions)
  const totalSpent = props.user.transactions.reduce((sum, t) => sum + t.amount, 0);
  console.log(totalSpent);

  return (
    <AccountView
      user={props.user}
      totalSpent={totalSpent}
    />
  )
}
