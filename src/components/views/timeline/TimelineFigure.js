import React from 'react'
import EmptyList from '../EmptyList'

function TimelineFigure(props){

  const renderFigure = () => {
    return <div>{props.data.name}</div>
  }

  return (
    <div>
      {props.data.length < 1 ? <EmptyList /> : renderFigure()}
    </div>
  );
}

export default TimelineFigure;
