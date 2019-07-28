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
import { CATEGORY } from '../../../data/resolvers'

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
  }
}))

// state handling
function newState() {
  return {
    category: '',
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

  // data state
  const [state, setState] = React.useState(newState());
  // ui state
  const [popover, setPopover] = React.useState(null);
  const popoverAnchorRef = React.useRef();
  // data actions
  const changeCategory = category => setState({...state, category});
  const changeDate = date => setState({...state, date});
  const changeAmount = e => setState({...state, amount: e.target.value });
  const changeDescription = e => setState({...state, description: e.target.value });
  const changeMemo = e => setState({...state, memo: e.target.value });
  // state validation
  const valid = {
    category: () => Object.keys(CATEGORY).includes(state.category),
    amount: () => state.amount > 0,
    description: () => state.description !== '',
    memo: () => state.memo !== '',
  }
  // erase data and close modal
  function closeModal(){
    setState(newState());
    props.handleClose();
  }

  return (
    <Modal
      open={props.open}
      onClose={closeModal}
      onRendered={()=> {
        if (props.crud === 'update') {
          setTimeout(()=>setState(getTransactionData()));
        } else {
          setTimeout(()=> {
            if (!valid.category()) setPopover(popoverAnchorRef.current);
          }, 300);
        }
      }}
      className={classes.modal}
      disableAutoFocus
      hideBackdrop={smallDevice}
    >
      <Slide direction='up' in={props.open} className={classes.container} mountOnEnter unmountOnExit>
        <Container maxWidth='sm' style={styles.container}>
          <TransactionModalHeader
            crud={props.crud}
            crudColor={getCrudColor()}
            closeModal={closeModal}
            category={{
              value: state.category,
              handler: changeCategory,
              valid: valid.category,
            }}
            amount={{
              value: state.amount,
              handler: changeAmount,
              valid: valid.amount,
            }}
            currency={props.data.user.currency}
            popover={{
              anchorRef: popoverAnchorRef,
              anchorEl: popover,
              setAnchorEl: setPopover,
            }}
            deleteButton={renderDeleteButton()}
          />
          <TransactionModalContent
            crud={props.crud}
            crudColor={getCrudColor()}
            date={{
              value: state.date,
              handler: changeDate,
            }}
            description={{
              value: state.description,
              handler: changeDescription,
              valid: valid.description,
            }}
            memo={{
              value: state.memo,
              handler: changeMemo,
              valid: valid.memo,
            }}
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
            crudColor={getCrudColor()}
          />
        );
      case 'update':
        return (
          <CrudButtonUpdateTransaction
            transactionId={props.currentId}
            updateData={state}
            closeModal={closeModal}
            valid={valid}
            crudColor={getCrudColor()}
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
