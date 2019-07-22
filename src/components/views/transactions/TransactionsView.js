import React from 'react'
import Typography from '@material-ui/core/Typography'
import SwipeableViews from './SwipeableViews'
import TransactionsHead from './TransactionsHead'
import TransactionsList from './TransactionsList'
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
  emptyList: {
    display: 'block',
    textAlign: 'center',
    height: '100%',
    '& > *': {
      marginTop: '50%',
      transform: 'translate(0, -50%)'
    }
  }
});

export default (props) => {
  const classes = useStyles();
  const containerStyle = {
    height: '100%',
    maxHeight: '100%',
  }

  const viewRef = [];
  props.data.forEach(x => {
    viewRef.push(React.useRef());
  })

  const EmptyList = () => (
    <div className={classes.emptyList}>
      <Typography variant='body1'>
        {'Add a transaction with the + button'}
      </Typography>
    </div>
  );

  const ListViews = () => (
    <SwipeableViews
      containerStyle={containerStyle}
      headerComponent={(
        <TransactionsHead
          months={props.data.map(d => d.name)}
        />
      )}
    >
      {props.data.map((monthSet, i) => (
        <div key={monthSet.id} ref={viewRef[i]}>
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
