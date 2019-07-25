import React from 'react'
import PropTypes from 'prop-types'
import Modal from '@material-ui/core/Modal'
import Slide from '@material-ui/core/Slide'
import Container from '@material-ui/core/Container'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import TransactionModalHeader from './TransactionModalHeader'
import TransactionModalContent from './TransactionModalContent'
import CrudButtonCreateTransaction from '../../crud/CrudButtonCreateTransaction'
import CrudButtonUpdateTransaction from '../../crud/CrudButtonUpdateTransaction'
import CrudButtonDeleteTransaction from '../../crud/CrudButtonDeleteTransaction'
import { makeStyles } from '@material-ui/styles'
import { withTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
  },
  slide: {
    height: '100%',
    padding: 0
  },
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    borderTop: `${theme.spacing(1)}px solid repeating-linear-gradient(
      -90deg,
      ${theme.palette.primary.main},
      ${theme.palette.primary.main} ${50*0.33}%,
      ${theme.palette.secondary.main} ${50*0.33}%,
      ${theme.palette.secondary.main} ${50*0.66}%,
      ${theme.palette.tertiary.main} ${50*0.66}%,
      ${theme.palette.tertiary.main} ${50}%
    )`,
  }
}))

// state handling
function newState() {
  return {
    icon: '',
    amount: 0,
    date: new Date(new Date().toDateString()),
    description: '',
    memo: ''
  };
}

// Component
function TransactionModal(props){
  const classes = useStyles(props.theme);
  const smallDevice = useMediaQuery(props.theme.breakpoints.down('sm'));
  const styles = {
    container: {
      height: smallDevice ? '100%' : 'auto',
      minHeight: smallDevice ? 'none' : '60%',
      maxHeight: smallDevice ? '100%' : `90%`,
    }
  }

  // state
  const [state, setState] = React.useState(newState());
  // actions
  const changeIcon = icon => setState({...state, icon});
  const changeDate = date => setState({...state, date});
  const changeAmount = e => setState({...state, amount: e.target.value });
  const changeDescription = e => setState({...state, description: e.target.value });
  const changeMemo = e => setState({...state, memo: e.target.value });
  // state validation
  const valid = {
    amount: () => state.amount > 0,
    description: () => state.description !== '',
    memo: () => state.memo !== '',
  }
  // erase data and close modal
  function closeModal(){
    setState(newState());
    props.handleClose();
  }

  const crudColor = getCrudColor();

  return (
    <Modal
      open={props.open}
      onClose={closeModal}
      onRendered={()=> {
        if (props.crud === 'update') setTimeout(setState(getTransactionData()))
      }}
      className={classes.modal}
      disableAutoFocus
      hideBackdrop={smallDevice}
    >
      <Slide direction='up' in={props.open} className={classes.container} mountOnEnter unmountOnExit>
        <Container maxWidth='sm' style={styles.container}>
          <TransactionModalHeader
            crud={props.crud}
            crudColor={crudColor}
            closeModal={closeModal}
            icon={state.icon}
            changeIcon={changeIcon}
            amount={state.amount}
            changeAmount={changeAmount}
            validAmount={valid.amount}
            currency={props.data.user.currency}
          />
          <TransactionModalContent
            crud={props.crud}
            crudColor={crudColor}
            date={state.date}
            changeDate={changeDate}
            description={state.description}
            changeDescription={changeDescription}
            memo={state.memo}
            changeMemo={changeMemo}
            validDescription={valid.description}
            validMemo={valid.memo}
            deleteButton={renderDeleteButton()}
          />
          {renderActionButton()}
        </Container>
      </Slide>
    </Modal>
  );

  // internal helpers
  function renderActionButton(){
    switch(props.crud){
      case 'create':
        return (
          <CrudButtonCreateTransaction
            creatorId={props.data.user.id}
            createData={state}
            closeModal={closeModal}
            valid={valid}
            crudColor={props.crudColor}
          />
        );
      case 'update':
        return (
          <CrudButtonUpdateTransaction
            transactionId={props.currentId}
            updateData={state}
            closeModal={closeModal}
            valid={valid}
            crudColor={props.crudColor}
          />
        );
      default:
        return null;
    }
  }
  // render delete button
  function renderDeleteButton(){
    return (
      <CrudButtonDeleteTransaction
        transactionId={props.currentId}
        closeModal={closeModal}
      />
    );
  }
  // get individual transaction data for modal if crud=update
  function getTransactionData(){
    const t = props.data.user.transactions.find(t => t.id === props.currentId);
    const result = {
      ...t,
      date: new Date(t.date),
      icon: '',
    }
    return result;
  }
  // get color of modal depending on crud action
  function getCrudColor(){
    return props.crud === 'update' ? 'primary' : 'secondary'
  }

}

TransactionModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  crud: PropTypes.string,
  data: (props, propName) => {
    if (props['crud'] === 'update' && (props[propName] === undefined || typeof(props[propName]) != 'object')){
      return new Error('Update operations require initial data to be provided via data props.')
    }
  },
}

TransactionModal.defaultProps = {
  open: false,
  data: {},
}

export default withTheme(TransactionModal);
