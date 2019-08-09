import React from 'react'
import MonthViews from '../MonthViews'
import TimelineSummary from './TimelineSummary'
import TimelineFigure from './TimelineFigure'

function TimelineView(props){
  const styles = {
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    }
  }

  return (
    <div style={styles.root}>
      <TimelineSummary
        user={props.user}
        data={props.data}
      />
      <TimelineFigure
        user={props.user}
        data={props.data}
        swipeable={props.swipeable}
        setSwipeable={props.setSwipeable}
      />
    </div>
  );
}

export default TimelineView;
