import React from 'react'
import MonthViews from '../MonthViews'
import TimelineFigure from './TimelineFigure'

function TimelineView(props){

  return (
    <MonthViews
      data={props.data.enhanced.transactions}
      lastPage={props.lastPage}
      setPage={props.setPage}
      headers={props.data.enhanced.transactions.map(d => d.name)}
      subset={set => set.groups}
    >
      <TimelineFigure />
    </MonthViews>
  );
}

export default TimelineView;
