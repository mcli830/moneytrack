import React from 'react'
import TimelineView from './TimelineView'

function Timeline(props){

  const lastPage = props.lastPage !== null ? props.lastPage : props.data.enhanced.initialView;

  return (
    <TimelineView
      data={props.data}
      lastPage={lastPage}
      setPage={props.setPage}
    />
  )
}

export default Timeline;
