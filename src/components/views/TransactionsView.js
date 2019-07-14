import React from 'react'
import Fab from '@material-ui/core/Fab'
import Icon from '@material-ui/core/Icon'
import Modal from '@material-ui/core/Modal'

import TransactionsGroup from './TransactionsGroup'
import TransactionsEntry from './TransactionsEntry'
import TransactionsAdd from './TransactionsAdd'

import { makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme();

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    padding: theme.spacing(2)
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    left: '50%',
    transform: 'translate(-50%, 0)'
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

  async function handleCreateTransaction(){

    // create modal to add new transaction
  }

  const [modalOpen, setModalOpen] = React.useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  }
  const handleModalClose = () => {
    setModalOpen(false);
  }

  return (
    <React.Fragment>
      {renderList()}
      <Fab className={classes.fab} color='primary' onClick={props.modal.handleOpen}>
        <Icon>add</Icon>
      </Fab>
      <TransactionsAdd
        open={props.modal.open}
        handleClose={props.modal.handleClose}
      />
    </React.Fragment>
  );
}
