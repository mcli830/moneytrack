import React from 'react'
import SwipeableViews from './SwipeableViews'
import TransactionsHead from './TransactionsHead'
import TransactionsList from './TransactionsList'
import EmptyList from './EmptyList'
import { makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme();

const useStyles = makeStyles({
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
});

export default (props) => {
  const classes = useStyles();
  const containerStyle = {
    height: '100%',
    maxHeight: '100%',
  }

  const ListViews = () => (
    <SwipeableViews
      containerStyle={containerStyle}
      startingView={props.startingView}
      headerComponent={(
        <TransactionsHead
          months={props.data.map(d => d.name)}
        />
      )}
    >
      {props.data.map((monthSet, i) => (
        <div key={monthSet.id}>
          <TransactionsList data={monthSet.groups} />
        </div>
      ))}
    </SwipeableViews>
  );

  return (
    <div className={classes.root}>
      <div className={classes.views}>
        {
          props.data.length < 1
          ? <EmptyList />
          : <ListViews />
        }
      </div>
    </div>
  );
}
