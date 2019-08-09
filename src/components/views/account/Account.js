import React from 'react'
import AccountView from './AccountView'
import { CURRENCY, resolveCurrencyValue } from '../../../data/resolvers'

function Account(props) {

  return (
    <AccountView
      user={props.user}
      stats={analyzeData(props.user.transactions, props.user.currency)}
      logout={props.logout}
      slide={props.slide}
      alerts={props.alerts}
    />
  )
}

// external helper
function getMonthId(d){
  return d.getFullYear()*100 + d.getMonth();
}
function analyzeData(data, currency){
  const dataset = {};
  data.forEach(t => {
    const monthId = getMonthId(new Date(t.date));
    if (!Object.hasOwnProperty(monthId)){
      dataset[monthId] = 0;
    }
    dataset[monthId] += t.amount;
  });

  const resolvedTotal = resolveCurrencyValue(data.reduce((sum,t) => sum + t.amount, 0), CURRENCY[currency].decimal)
  const total = parseFloat(resolvedTotal).toFixed(2);
  const monthly = parseFloat((total / Object.keys(dataset).length).toString()).toFixed(2);
  const weekly = parseFloat(monthly * 0.25).toFixed(2);

  return { total, monthly, weekly };
}

export default Account;
