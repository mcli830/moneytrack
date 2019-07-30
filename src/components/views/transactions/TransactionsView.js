import React from 'react'
import SwipeableViews from './SwipeableViews'
import TransactionsHead from './TransactionsHead'
import TransactionsList from './TransactionsList'
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

function TransactionsView(props) {
  const classes = useStyles(useTheme());
  const containerStyle = {
    height: '100%',
    maxHeight: '100%',
  }

  function _renderListViews() {
    return (
      <SwipeableViews
        containerStyle={containerStyle}
        startingView={props.lastPage}
        headerComponent={(addProps) => (
          <TransactionsHead
            {...addProps}
            months={props.data.map(d => d.name)}
            setPage={props.setPage}
            />
        )}
        onSwiped={(view)=>props.setPage(view)}
        >
        {props.data.map((monthSet, i) => {
          return (addProps) => {
            return (
              <div {...addProps} key={monthSet.id}>
                <TransactionsList
                  data={monthSet.groups}
                  updateTransactionModal={props.updateTransactionModal}
                  />
              </div>
            );
          }
        })}
      </SwipeableViews>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.views}>
        {
          props.data.length < 1
          ? <EmptyList />
          : _renderListViews()
        }
      </div>
    </div>
  );
}

export default TransactionsView;
