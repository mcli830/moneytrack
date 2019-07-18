import React from 'react'
import PropTypes from 'prop-types'
import Modal from '@material-ui/core/Modal'
import Slide from '@material-ui/core/Slide'
import Container from '@material-ui/core/Container'
import TransactionModalHeader from './TransactionModalHeader'
import TransactionModalContent from './TransactionModalContent'
import CrudButtonCreateTransaction from '../../crud/CrudButtonCreateTransaction'
import { makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme();

const useStyles = makeStyles({
  slide: {
    height: '100%',
    padding: 0
  },
  container: {
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
  }
})

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

const reducer = (state, action) => {
  switch(action.type){
    case 'ICON':
      return {...state, icon: action.payload};
    case 'AMOUNT':
      return {...state, amount: action.payload};
    case 'DATE':
      return {...state, date: action.payload};
    case 'DESC':
      return {...state, description: action.payload};
    case 'MEMO':
      return {...state, memo: action.payload}
    case 'CLEAR':
    default:
      return newState();
  }
}

// Component
function TransactionModal(props){
  const classes = useStyles();

  // state & reducer
  const [state, dispatch] = React.useReducer(
    reducer,
    Object.assign(newState(), props.data)
  );
  // actions
  const changeIcon = icon => dispatch({ type: 'ICON', payload: icon });
  const changeDate = date => dispatch({ type: 'DATE', payload: date });
  const changeAmount = e => dispatch({ type: 'AMOUNT', payload: e.target.value });
  const changeDescription = e => dispatch({ type: 'DESC', payload: e.target.value });
  const changeMemo = e => dispatch({ type: 'MEMO', payload: e.target.value });
  // state validation
  const valid = {
    amount: () => state.amount > 0,
    description: () => state.description !== '',
    memo: () => state.memo !== '',
  }
  // erase data and close modal
  function closeModal(){
    dispatch({ type: 'CLEAR' });
    props.handleClose();
  }

  return (
    <Modal
      open={props.open}
      onClose={closeModal}
      BackdropProps={{style: {backgroundColor: 'transparent'}}}
    >
      <Slide direction='up' in={props.open} className={classes.container} mountOnEnter unmountOnExit>
        <Container maxWidth='md'>
          <TransactionModalHeader
            closeModal={closeModal}
            icon={state.icon}
            changeIcon={changeIcon}
            amount={state.amount}
            changeAmount={changeAmount}
            validAmount={valid.amount}
            currency={props.data.user.currency}
          />
          <TransactionModalContent
            date={state.date}
            changeDate={changeDate}
            description={state.description}
            changeDescription={changeDescription}
            changeMemo={changeMemo}
            validDescription={valid.description}
            validMemo={valid.memo}
          />
          <CrudButtonCreateTransaction
            creatorId={props.data.user.id}
            createData={state}
            closeModal={closeModal}
            valid={valid}
          />
        </Container>
      </Slide>
    </Modal>
  );

  ///////////////////
  // render helper
  //////////////////

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

export default TransactionModal;
