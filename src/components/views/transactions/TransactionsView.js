import React from 'react'
import Typography from '@material-ui/core/Typography'
import TransactionsList from './TransactionsList'

import { makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme();

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  list: {
    height: '1 1 auto',
    maxHeight: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    position: 'absolute',
    height: theme.spacing(6),
    top: '100%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
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

  function EmptyList(){
    return (
      <div className={classes.emptyList}>
        <Typography variant='body1'>
          {'Add a transaction with the + button'}
        </Typography>
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <div className={classes.list}>
        {
          props.data.length < 1
          ? <EmptyList />
          : <TransactionsList data={props.data} />
        }
      </div>
    </div>
  );
}
