import React from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

import TransactionsGroup from './TransactionsGroup'
import TransactionsEntry from './TransactionsEntry'
import AddTransactionModal from './add/AddTransaction'

import { makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme();

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    height: '100%',
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  button: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 0)',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  }
});

export default (props) => {
  const classes = useStyles();

  function renderList(){
    const output = [];
    for (let [group, data] of Object.entries(props.data)){
      output.push(
        <TransactionsGroup
          date={data.transactions[0].dateString}
          total={data.total}
          key={group}
        />
      );
      output.push(
        data.transactions.map(t => (
          <TransactionsEntry data={t} key={t.id} />
        ))
      );
    }
    return output;
  }

  return (
    <div className={classes.root}>
      {renderList()}
      <Button variant='contained' className={classes.button} color='primary' onClick={props.modal.handleOpen}>
        <Icon>add</Icon>
      </Button>
      <AddTransactionModal
        user={props.user}
        open={props.modal.open}
        handleClose={props.modal.handleClose}
      />
    </div>
  );
}
