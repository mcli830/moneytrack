import React from 'react'
import SwipeableViews from './SwipeableViews'
import SwipeableHeader from './SwipeableHeader'
import EmptyList from './EmptyList'
import { makeStyles } from '@material-ui/styles'
import { useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    maxHeight: '100%',
    width: '100%',
  },
  head: {
    width: '100%'
  },
  views: {
    flex: '1 1 auto',
  },
}));

function MonthViews(props) {
  const classes = useStyles(useTheme());
  const containerStyle = {
    height: '100%',
    maxHeight: '100%',
  }

  return (
    <div className={classes.root}>
      <div className={classes.views}>
        {
          props.data.length < 1
          ? <EmptyList />
        : (
            <SwipeableViews
              disableTouch={props.disableTouch}
              containerStyle={containerStyle}
              startingView={props.lastPage}
              pageRefs={props.data.map(page => page.ref)}
              headerComponent={props.headers ? (addProps) => (
                <SwipeableHeader
                  {...addProps}
                  months={props.headers}
                  setPage={props.setPage}
                />
              ) : null}
              onSwiped={(view)=>props.setPage(view)}
            >
              {props.data.map((set, i) => React.cloneElement(props.children, {
                key: set.id,
                data: set,
                empty: parseFloat(set.total) <= 0,
              }))}
            </SwipeableViews>
          )
        }
      </div>
    </div>
  );
}

export default MonthViews;
