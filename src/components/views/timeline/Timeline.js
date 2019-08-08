import React from 'react'
import TimelineView from './TimelineView'

function Timeline(props){

  const lastPage = props.lastPage !== null ? props.lastPage : props.data.enhanced.initialView;

  const [swipeable, setSwipeable] = React.useState(true);

  return (
    <TimelineView
      data={props.data}
      lastPage={lastPage}
      setPage={props.setPage}
      swipeable={swipeable}
      setSwipeable={setSwipeable}
    />
  )
}

export default Timeline;
