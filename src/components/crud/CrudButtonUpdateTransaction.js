import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Loader from '../system/Loader'
import { withApollo, Mutation } from 'react-apollo'
import { UPDATE_TRANSACTION_MUTATION } from '../../graphql/mutations'
import { GET_USER_DATA, LOGGED_IN_USER } from '../../graphql/queries'

function CrudButtonUpdateTransaction(props){
  const { valid, updateData, transactionId } = props;
  const styles = {
    button: {
      borderRadius: 0,
      boxShadow: 'none',
      width: '100%',
    }
  }

  return (
    <Mutation
      mutation={UPDATE_TRANSACTION_MUTATION}
      update={(cache, { data })=>{
        const { loggedInUser } = cache.readQuery({query: LOGGED_IN_USER});
        const { User } = cache.readQuery({
          query: GET_USER_DATA,
          variables: { id: loggedInUser.id },
        });
        const updatedId = data.updateTransaction.id;
        const index = User.transactions.findIndex(d => d.id === updatedId);
        const newData = User.transactions.slice();
        newData[index] = data.updateTransaction;
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
        props.alerts.notification({
          message: 'Transaction updated.',
          color: 'primary',
        })
      }}
    >
      {(updateTransaction, {data, error, loading})=>(
        <Button
          id='gql-update-transaction'
          ref={props.buttonRef}
          variant='contained'
          size='large'
          color={props.crudColor}
          style={styles.button}
          disabled={loading || !(valid.category() && valid.amount())}
          onClick={()=>updateTransaction({
            variables: {
              id: transactionId,
              category: updateData.category,
              date: updateData.date,
              description: updateData.description,
              amount: updateData.amount,
              note: updateData.note,
            }
          })}
        >
          {error ? console.error(error) : null}
          { loading
            ? <Loader size={26} thickness={3} />
            : !valid.category()
              ? 'Choose a category'
              : !valid.amount()
                ? 'Add an amount'
                : 'Save changes'
          }
        </Button>
      )}
    </Mutation>
  );
}

CrudButtonUpdateTransaction.propTypes = {
  updateData: PropTypes.object.isRequired, // data used to update db document
  closeModal: PropTypes.func.isRequired,
  valid: PropTypes.object.isRequired,
}

export default withApollo(CrudButtonUpdateTransaction);
