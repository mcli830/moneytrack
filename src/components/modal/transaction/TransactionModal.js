import React from 'react'
import PropTypes from 'prop-types'
import Modal from '@material-ui/core/Modal'
import Slide from '@material-ui/core/Slide'
import Container from '@material-ui/core/Container'
import TransactionModalHeader from './TransactionModalHeader'
import TransactionModalContent from './TransactionModalContent'
import CrudButtonCreateTransaction from '../../crud/CrudButtonCreateTransaction'
import CrudButtonUpdateTransaction from '../../crud/CrudButtonUpdateTransaction'
import CrudButtonDeleteTransaction from '../../crud/CrudButtonDeleteTransaction'
import withAlerts from '../../system/withAlerts'
import { withTheme } from '@material-ui/core/styles'
import { CURRENCY, resolveCurrencyValue, CATEGORY } from '../../../data/resolvers'


// state handling
function newState() {
  return {
    data: {
      category: '',
      amount: '',
      date: new Date(new Date().toDateString()),
      description: '',
      note: ''
    },
    popover: null
  };
}

// Component
function TransactionModal(props) {
  // data state
  const [state, setState] = React.useState(newState());
  const popoverAnchorRef = React.useRef();
  const submitButtonRef = React.useRef();
  // data actions
  const changeCategory = category => setState({...state, data: { ...state.data, category }});
  const changeDate = date => setState({...state, data: {...state.data, date }});
  const changeAmount = e => setState({...state, data: {...state.data, amount: e.target.value }});
  const changeDescription = e => setState({...state, data: {...state.data, description: e.target.value }});
  const changeNote = e => setState({...state, data: {...state.data, note: e.target.value }});
  const setPopoverAnchor = anchor => setState({...state, popover: anchor});
  // state validation
  const valid = {
    category: () => Object.keys(CATEGORY).includes(state.data.category),
    amount: () => {
      const val = state.data.amount;
      if (val.length < 1) return false;
      if (/[^0-9.]/g.test(val)) return false;
      if (val.split('').filter(c => c === '.').length > 1) return false;
      const di = state.data.amount.indexOf('.');
      return di < 0 ? true : val.length - di <= 3;
    },
    description: () => state.data.description !== '',
    note: () => state.data.note !== '',
  }
  // erase data and close modal
  const closeModal = () => {
    props.handleClose();
    setState(newState());
  }

  // key listener
  const handleKeyDown = e => {
    if (e.which === 13 || e.keyCode === 13) {
      submitButtonRef.current.click();
    }
  }

  // get individual transaction data for modal if crud=update
  const getTransactionData = () => {
    const t = props.data.user.transactions.find(t => t.id === props.currentId);
    const result = {
      ...t,
      date: new Date(t.date),
      amount: resolveCurrencyValue(t.amount, CURRENCY[props.data.user.currency].decimal)
    }
    return result;
  }
  // get color of modal depending on crud action
  const getCrudColor = () => {
    return props.crud === 'update' ? 'primary' : 'secondary'
  }

  // validate amount from string to number
  const validateAmount = (amt) => {
    var v = typeof amt === 'number' ? amt.toString() : amt;
    return parseInt(v*Math.pow(10,CURRENCY[props.data.user.currency].decimal), 10);
  }

  // internal renderers
  const renderActionButton = () => {
    const modalData = {
      ...state.data,
      amount: validateAmount(state.data.amount),
    }
    switch(props.crud){
      case 'create':
        return (
          <CrudButtonCreateTransaction
            creatorId={props.data.user.id}
            createData={modalData}
            closeModal={closeModal}
            valid={valid}
            crudColor={getCrudColor()}
            alerts={props.alerts}
            buttonRef={submitButtonRef}
          />
        );
      case 'update':
        return (
          <CrudButtonUpdateTransaction
            transactionId={props.currentId}
            updateData={modalData}
            closeModal={closeModal}
            valid={valid}
            crudColor={getCrudColor()}
            alerts={props.alerts}
            buttonRef={submitButtonRef}
          />
        );
      default:
        return null;
    }
  }
  // render delete button
  const renderDeleteButton = () => {
    return (
      <CrudButtonDeleteTransaction
        transactionId={props.currentId}
        closeModal={closeModal}
        alerts={props.alerts}
      />
    );
  }

  // render
  const smallDevice = window.innerWidth <= 600  ;
  const styles = {
    modal: {
      display: 'flex',
      alignItems: 'center',
    },
    container: {
      backgroundColor: '#fff',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      height: smallDevice ? '100%' : 'auto',
      minHeight: smallDevice ? 'none' : '60%',
      maxHeight: smallDevice ? '100%' : `90%`,
    },
  }

  return (
    <Modal
      open={props.open}
      onClose={closeModal}
      style={styles.modal}
      disableAutoFocus
      hideBackdrop={smallDevice}
      closeAfterTransition
      onRendered={()=>{
        if (props.open){
          if (props.crud === 'update'){
            setState({ ...state, data: getTransactionData() })
          } else {
            setTimeout(()=>{
              if (!valid.category()) setState({...state, popover: popoverAnchorRef.current});
            }, 500)
          }
        }
      }}
    >
      <Slide direction='up' in={props.open}>
        <Container maxWidth='sm' style={styles.container} onKeyDown={handleKeyDown}>
          <TransactionModalHeader
            crud={props.crud}
            crudColor={getCrudColor()}
            closeModal={closeModal}
            category={{
              value: state.data.category,
              handler: changeCategory,
              valid: valid.category,
            }}
            amount={{
              value: state.data.amount,
              handler: changeAmount,
              valid: valid.amount,
            }}
            currency={props.data.user.currency}
            popover={{
              anchorRef: popoverAnchorRef,
              anchorEl: state.popover,
              setAnchorEl: setPopoverAnchor,
            }}
            deleteButton={renderDeleteButton()}
          />
          <TransactionModalContent
            crud={props.crud}
            crudColor={getCrudColor()}
            date={{
              value: state.data.date,
              handler: changeDate,
            }}
            description={{
              value: state.data.description,
              handler: changeDescription,
              valid: valid.description,
            }}
            note={{
              value: state.data.note,
              handler: changeNote,
              valid: valid.note,
            }}
          />
          {renderActionButton()}
        </Container>
      </Slide>
    </Modal>
  );
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

export default withTheme(withAlerts(TransactionModal));
