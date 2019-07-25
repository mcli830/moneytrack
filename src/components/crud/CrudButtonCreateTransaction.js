import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Loader from '../system/Loader'
import { withApollo, Mutation } from 'react-apollo'
import { ADD_TRANSACTION_MUTATION } from '../../graphql/mutations'
import { GET_USER_DATA, LOGGED_IN_USER } from '../../graphql/queries'


function CrudButtonCreateTransaction(props){
  const { valid, createData } = props;
  const styles = {
    button: {
      borderRadius: 0,
      boxShadow: 'none',
      width: '100%'
    }
  }
  return (
    <Mutation
      mutation={ADD_TRANSACTION_MUTATION}
      update={(cache, { data })=>{
        const { loggedInUser } = cache.readQuery({query: LOGGED_IN_USER});
        const { User } = cache.readQuery({
          query: GET_USER_DATA,
          variables: { id: loggedInUser.id },
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
        props.closeModal();
      }}
    >
      {(addTransaction, {data, error, loading}) => (
        <Button
          id='gql-add-transaction'
          variant='contained'
          size='large'
          color={props.crudColor}
          style={styles.button}
          disabled={loading || !(valid.amount() && valid.description())}
          onClick={()=>addTransaction({
            variables: {
              creatorId: props.creatorId,
              date: createData.date,
              description: createData.description,
              amount: parseInt(createData.amount),
              memo: createData.memo,
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
                : !valid.description()
                  ? 'Add a description'
                  : 'Save transaction'
          }
        </Button>
      )}
    </Mutation>
  )
}

CrudButtonCreateTransaction.propTypes = {
  createData: PropTypes.object.isRequired, // data used to create new db document
  creatorId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  valid: PropTypes.object.isRequired,
}

export default withApollo(CrudButtonCreateTransaction);
