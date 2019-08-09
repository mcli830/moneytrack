import { CURRENCY, resolveCurrencyValue, CATEGORY } from '../../data/resolvers'
import { MONTH } from '../../data/enums'

function getMonthName(date){
  return `${MONTH[date.getMonth()]} ${date.getFullYear()}`;
}
function getMonthId(date){
  return date.getFullYear()*100 + date.getMonth();
}
function getInitialView(data){
  if (!data) return null;
  const today = new Date();
  const currentMonthId = today.getFullYear()*100 + today.getMonth();
  return data.findIndex(month => currentMonthId === month.id);
}
function removeZeroCents(numStr){
  return /\d+\.00/.test(numStr) ? numStr.slice(0,numStr.indexOf('.')) : numStr;
}

export default function prepareTransactionsData(data){
  const dataset = {}
  const currencyAttr = CURRENCY[data.currency];
  data.transactions.forEach(t => {
    const tDate = new Date(t.date);
    const amountDisplay = removeZeroCents(resolveCurrencyValue(t.amount, currencyAttr.decimal));
    // get each transaction node data ready for render
    const current = {
      ...t,
      amount: currencyAttr.decimal > 0 ? parseFloat(amountDisplay) : parseInt(amountDisplay, 10),
      amountDisplay,
      date: tDate,
      dateString: `${MONTH[tDate.getMonth()]} ${tDate.getDate()}`,
      // monthId = (year)(month) e.g. 201907 = July 2019
      monthId: getMonthId(tDate),
      // dateId = [1-31] i.e. the date number
      dateId: tDate.getDate(),
      currency: data.currency,
      symbol: currencyAttr.symbol,
      category: CATEGORY[t.category],
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
  const currentMonth = new Date(today.getFullYear(), today.getMonth());
  // loop to fill empty months
  for (let y = earliestMonth.getFullYear(); y <= currentMonth.getFullYear(); y++){
    let startingMonth = y === earliestMonth.getFullYear() ? earliestMonth.getMonth() : 0;
    let endingMonth = y === currentMonth.getFullYear() ? currentMonth.getMonth() : 11;
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
  const transactionData = Object.keys(dataset).map(monthId => {
    // convert group data object into array with totals and sorted inversely by date id
    const groupData = Object.keys(dataset[monthId].groups).map(dateId => ({
      ...dataset[monthId].groups[dateId],
      total: parseFloat(dataset[monthId].groups[dateId].transactions.reduce((a,b)=>a+b.amount,0).toString()).toFixed(currencyAttr.decimal),
    })).sort((a,b)=>b.id-a.id);
    return {
      ...dataset[monthId],
      groups: groupData
    }
  });
  return {
    transactions: transactionData,
    initialView: getInitialView(transactionData),
  }
}
