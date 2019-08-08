import React from 'react'
import MonthViews from '../MonthViews'
import TimelineFigure from './TimelineFigure'

function TimelineView(props){

  return (
    <MonthViews
      disableTouch={!props.swipeable}
      data={props.data.enhanced.transactions}
      lastPage={props.lastPage}
      setPage={props.setPage}
      headers={props.data.enhanced.transactions.map(d => d.name)}
      subset={set => set.groups}
    >
      <TimelineFigure
        user={props.data.user}
        swipeable={props.swipeable}
        setSwipeable={props.setSwipeable}
      />
    </MonthViews>
  );
}

export default TimelineView;
