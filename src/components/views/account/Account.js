import React from 'react'
import AccountView from './AccountView'

export default (props) => {

  const totalSpent = props.data.user.transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <AccountView
      user={props.data.user}
      totalSpent={totalSpent}
    />
  )
}
