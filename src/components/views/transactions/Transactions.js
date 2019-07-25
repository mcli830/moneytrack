import React from 'react'
import { withApollo } from 'react-apollo'
import Async from 'react-async'
import TransactionsView from './TransactionsView'
import Loader from '../../system/Loader'
import Error from '../../system/Error'
import { CURRENCY } from '../../../data/resolvers'
import { MONTH } from '../../../data/enums'

function Transactions(props) {

  const processData = () => new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(formatData(props.data));
    })
  });

  return (
    <Async promiseFn={processData}>
      <Async.Loading>
        <Loader message='Loading' />
      </Async.Loading>
      <Async.Resolved>
        {data => {
          const lastPage = props.lastPage !== null ? props.lastPage : getStartingView(data);
          return (
            <TransactionsView
              user={props.data.user}
              data={data}
              lastPage={lastPage}
              setPage={props.setPage}
              updateTransactionModal={props.updateTransactionModal}
            />
          );
        }}
      </Async.Resolved>
      <Async.Rejected>
        {error => <Error message={error.message} />}
      </Async.Rejected>
    </Async>
  );

}

// external helpers
// function getDateString(date){
//   return date.toDateString().replace(/\w+\s(\w+)(\s\w+)(\s\w+)/, '$1$2,$3');
// }
function getMonthName(date){
  return `${MONTH[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}
function getMonthId(date){
  return date.getUTCFullYear()*100 + date.getUTCMonth();
}
function getStartingView(data){
  if (!data) return null;
  const today = new Date();
  const currentMonthId = today.getUTCFullYear()*100 + today.getUTCMonth();
  return data.findIndex(month => currentMonthId === month.id);
}

function formatData(data){
  const dataset = {}
  data.user.transactions.forEach(t => {
    const tDate = new Date(t.date);
    // get each transaction node data ready for render
    const current = {
      ...t,
      date: tDate,
      dateString: `${MONTH[tDate.getUTCMonth()]} ${tDate.getUTCDate()}`,
      // monthId = (year)(month) e.g. 201907 = July 2019
      monthId: getMonthId(tDate),
      // dateId = [1-31] i.e. the date number
      dateId: tDate.getUTCDate(),
      currency: data.user.currency,
      symbol: CURRENCY[data.user.currency],
    };
    // create month set if not existing
    if (!dataset[current.monthId]){
      dataset[current.monthId] = {
        id: current.monthId,
        name: getMonthName(current.date),
        groups: {},
      }
    }
    // create date set if not existing
    if (!dataset[current.monthId].groups[current.dateId]){
      dataset[current.monthId].groups[current.dateId] = {
        id: current.dateId,
        date: current.date,
        dateString: current.dateString,
        symbol: current.symbol,
        transactions: []
      }
    }
    // add transaction to its date group
    dataset[current.monthId].groups[current.dateId].transactions.push(current);
  })
  // fill in month sets with empty months up to current month
  // const monthsWithData = dataset.map(set => new Date(set.id.slice(0,4), set.id.slice(4)));
  // const earliestDate = new Date(Math.min.apply(Math, monthsWithData));
  const earliestMonthId = Math.min.apply(Math, Object.keys(dataset)).toString();
  const earliestMonth = new Date(earliestMonthId.slice(0,4), earliestMonthId.slice(4));
  const today = new Date();
  const currentMonth = new Date(today.getUTCFullYear(), today.getUTCMonth());
  // loop to fill empty months
  for (let y = earliestMonth.getUTCFullYear(); y <= currentMonth.getUTCFullYear(); y++){
    let startingMonth = y === earliestMonth.getUTCFullYear() ? earliestMonth.getUTCMonth() : 0;
    let endingMonth = y === currentMonth.getUTCFullYear() ? currentMonth.getUTCMonth() : 11;
    for (let m = startingMonth; m <= endingMonth ; m++){
      const workingId = y*100 + m;
      if (!dataset[workingId]) {
        dataset[workingId] = {
          id: workingId,
          name: getMonthName(new Date(y, m)),
          groups: {},
        }
      }
    }
  }
  // return dataset as array with inner groups as arrays
  return Object.keys(dataset).map(monthId => {
    // convert group data object into array with totals and sorted inversely by date id
    const groupData = Object.keys(dataset[monthId].groups).map(dateId => {
      return {
        ...dataset[monthId].groups[dateId],
        total: dataset[monthId].groups[dateId].transactions.reduce((a,b)=>a+b.amount,0),
      };
    }).sort((a,b)=>b.id-a.id);
    return {
      ...dataset[monthId],
      groups: groupData
    }
  });
}

export default withApollo(Transactions);
