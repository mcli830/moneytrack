import React from 'react'
import Modal from '@material-ui/core/Modal'
import Slide from '@material-ui/core/Slide'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

import ModalHeader from './ModalHeader'
import ModalContent from './ModalContent'

import { makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme();

const useStyles = makeStyles({
  backdrop: {
    backgroundColor: 'transparent'
  },
  slide: {
    transformOrigin: '50% 100%',
    height: '100%',
    padding: 0
  },
  container: {
    height: '100vh',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },
  confirm: {
    position: 'absolute',
    bottom: 0,
    borderRadius: 0,
    boxShadow: 'none'
  }
})


// state handling
function baseState() {
  return {
    icon: '',
    amount: 0,
    currency: 'USD',
    date: new Date(),
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
      return baseState();
  }
}

export default (props) => {
  const classes = useStyles();

  // state & reducer
  const [state, dispatch] = React.useReducer(reducer, baseState());
  // actions
  function changeIcon(icon){
    dispatch({ type: 'ICON', payload: icon})
  }
  function changeDate(date){
    dispatch({ type: 'DATE', payload: date });
  }
  function changeAmount(e){
    dispatch({ type: 'AMOUNT', payload: e.target.value });
  }
  function changeDescription(e){
    dispatch({ type: 'DESC', payload: e.target.value });
  }
  function changeMemo(e){
    dispatch({ type: 'MEMO', payload: e.target.value });
  }

  // state validation
  function validAmount(){
    return state.amount > 0;
  }
  function validDescription(){
    return state.description !== '';
  }
  function validMemo(){
    return state.memo !== '';
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
      BackdropProps={{
        style: {
          backgroundColor: theme.palette.background.default,
        }
      }}
    >
      <Slide direction='up' mountOnEnter unmountOnExit in={props.open} className={classes.slide}>
        <Container maxWidth='md' className={classes.container}>
          <ModalHeader
            closeModal={closeModal}
            icon={state.icon}
            changeIcon={changeIcon}
            amount={state.amount}
            changeAmount={changeAmount}
            validAmount={validAmount}
            currency={state.currency}
          />
          <ModalContent
            date={state.date}
            changeDate={changeDate}
            description={state.description}
            changeDescription={changeDescription}
            changeMemo={changeMemo}
            validDescription={validDescription}
            validMemo={validMemo}
          />
          <Button
            variant='contained'
            size='large'
            color='primary'
            fullWidth
            className={classes.confirm}
          >
            Add Transaction
          </Button>
        </Container>
      </Slide>
    </Modal>
  );
}
