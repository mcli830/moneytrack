import React from 'react'
import Button from '@material-ui/core/Button'
import Loader from '../system/Loader'
import { withApollo, Mutation } from 'react-apollo'
import { DELETE_TRANSACTION_MUTATION } from '../../graphql/mutations'
import { GET_USER_DATA, LOGGED_IN_USER } from '../../graphql/queries'
import red from '@material-ui/core/colors/red'
import { createMuiTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'

const theme = createMuiTheme();

const useStyles = makeStyles({
  root: {
    width: '100%',
    paddingTop: theme.spacing(3),
    textAlign: 'center',
  },
  button: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    '&:hover': {
      color: theme.palette.error.contrastText,
      backgroundColor: theme.palette.error.main,
    }
  }
})

function CrudButtonDeleteTransaction(props){
  const { transactionId } = props;
  const classes = useStyles();

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
