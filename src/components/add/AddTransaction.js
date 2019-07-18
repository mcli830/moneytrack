import React from 'react'
import Modal from '@material-ui/core/Modal'
import Slide from '@material-ui/core/Slide'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import ModalHeader from './ModalHeader'
import ModalContent from './ModalContent'
import Loader from '../Loader'
import { makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { withApollo, Mutation } from 'react-apollo'
import { ADD_TRANSACTION_MUTATION } from '../../graphql/mutations'
import { GET_USER_DATA, LOGGED_IN_USER } from '../../graphql/queries'

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
  },
  confirm: {
    borderRadius: 0,
    boxShadow: 'none',
    width: '100%'
  }
})

// state handling
function baseState() {
  return {
    icon: '',
    amount: 0,
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

function AddTransactionModal(props){
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
          backgroundColor: 'transparent',
        }
      }}
    >
      <Slide direction='up' in={props.open} className={classes.container} mountOnEnter unmountOnExit>
        <Container maxWidth='md'>
          <ModalHeader
            closeModal={closeModal}
            icon={state.icon}
            changeIcon={changeIcon}
            amount={state.amount}
            changeAmount={changeAmount}
            validAmount={validAmount}
            currency={props.data.user.currency}
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
          <SendMutationButton />
        </Container>
      </Slide>
    </Modal>
  );

  ///////////////////
  // render helper
  //////////////////
  function SendMutationButton(){
    return (
      <Mutation
        mutation={ADD_TRANSACTION_MUTATION}
        update={(cache, { data })=>{
          const { loggedInUser } = cache.readQuery({query: LOGGED_IN_USER});
          const { User } = cache.readQuery({
            query: GET_USER_DATA,
            variables: {
              id: loggedInUser.id
            }
          })
          cache.writeQuery({
            query: GET_USER_DATA,
            data: {
              User: {
                ...User,
                transactions: User.transactions.concat([data.createTransaction])
              }
            }
          })
          closeModal();
        }}
      >
        {(addTransaction, {data, error, loading}) => (
          <Button
            id='gql-add-transaction'
            variant='contained'
            size='large'
            color='primary'
            className={classes.confirm}
            disabled={loading || !(validAmount() && validDescription())}
            onClick={()=>addTransaction({
              variables: {
                creatorId: props.data.user.id,
                date: state.date,
                description: state.description,
                amount: parseInt(state.amount),
                memo: state.memo
              }
            })}
          >
            {error ? console.error(error) : null}
            { loading
              ? <Loader size={26} thickness={3} />
              : !validAmount()
                ? 'Add an amount'
                : !validDescription()
                  ? 'Add a description'
                  : 'Add transaction'
            }
          </Button>
        )}
      </Mutation>
    )
  }
}

export default withApollo(AddTransactionModal);
