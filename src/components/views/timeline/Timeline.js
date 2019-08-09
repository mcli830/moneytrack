import React from 'react'
import MonthViews from '../MonthViews'
import TimelineView from './TimelineView'

function Timeline(props){

  const lastPage = props.lastPage !== null ? props.lastPage : props.data.enhanced.initialView;

  const [swipeable, setSwipeable] = React.useState(true);

  return (
    <MonthViews
      disableTouch={!swipeable}
      data={props.data.enhanced.transactions}
      lastPage={lastPage}
      setPage={props.setPage}
      headers={props.data.enhanced.transactions.map(d => d.name)}
      subset={set => set.groups}
    >
      <TimelineView
        user={props.data.user}
        swipeable={swipeable}
        setSwipeable={setSwipeable}
      />
    </MonthViews>
  )
}

export default Timeline;
