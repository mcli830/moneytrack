import React from 'react'
import SummaryHighlights from './SummaryHighlights'
import SummaryFigure from './SummaryFigure'

function SummaryView(props){
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
      <SummaryHighlights
        user={props.user}
        data={props.data}
      />
      <SummaryFigure
        user={props.user}
        data={props.data}
        swipeable={props.swipeable}
        setSwipeable={props.setSwipeable}
      />
    </div>
  );
}

export default SummaryView;
