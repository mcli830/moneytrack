import React from 'react'
import AccountView from './AccountView'

export default (props) => {

  return (
    <AccountView
      user={props.data.user}
      stats={analyzeData(props.data.user.transactions)}
    />
  )
}


// external helper
function getMonthId(d){
  return d.getUTCFullYear()*100 + d.getUTCMonth();
}
function analyzeData(data){
  const dataset = {};
  data.forEach(t => {
    const monthId = getMonthId(new Date(t.date));
    if (!Object.hasOwnProperty(monthId)){
      dataset[monthId] = 0;
    }
    dataset[monthId] += t.amount;
  });

  const total = data.reduce((sum,t) => sum + t.amount, 0);
  const monthly = parseFloat((total / Object.keys(dataset).length).toString()).toFixed(2);
  const weekly = parseFloat(monthly * 0.25).toFixed(2);

  return { total, monthly, weekly };
}
