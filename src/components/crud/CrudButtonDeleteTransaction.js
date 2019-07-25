import React from 'react'
import Button from '@material-ui/core/Button'
import Loader from '../system/Loader'
import { withApollo, Mutation } from 'react-apollo'
import { DELETE_TRANSACTION_MUTATION } from '../../graphql/mutations'
import { GET_USER_DATA, LOGGED_IN_USER } from '../../graphql/queries'
import { useTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(3, 0),
    textAlign: 'center',
  },
  button: {
    color: theme.palette.error.light,
    borderColor: theme.palette.error.light,
    '&:hover': {
      color: theme.palette.error.contrastText,
      backgroundColor: theme.palette.error.light,
    }
  }
}))

function CrudButtonDeleteTransaction(props){
  const { transactionId } = props;
  const classes = useStyles(useTheme());

  return (
    <Mutation
      mutation={DELETE_TRANSACTION_MUTATION}
      update={(cache, { data })=>{
        const { loggedInUser } = cache.readQuery({query: LOGGED_IN_USER});
        const { User } = cache.readQuery({
          query: GET_USER_DATA,
          variables: { id: loggedInUser.id },
        });
        const deletedId = data.deleteTransaction.id;
        const index = User.transactions.findIndex(d => d.id === deletedId);
        const newData = User.transactions.slice();
        newData.splice(index, 1);
        cache.writeQuery({
          query: GET_USER_DATA,
          data: {
            User: {
              ...User,
              transactions: newData,
            }
          }
        });
        props.closeModal();
      }}
    >
      {(deleteTransaction, {data, error, loading})=>(
        <div className={classes.root}>
          <Button
            id='gql-delete-transaction'
            variant='outlined'
            size='medium'
            className={classes.button}
            onClick={()=>deleteTransaction({
              variables: { id: transactionId }
            })}
          >
            {error ? console.error(error) : null}
            {loading
             ? <Loader size={26} thickness={3} color='inherit' />
             : 'Delete'
            }
          </Button>
        </div>
      )}
    </Mutation>
  );
}

export default withApollo(CrudButtonDeleteTransaction);
