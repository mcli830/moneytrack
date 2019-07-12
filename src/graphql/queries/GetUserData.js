import gql from 'graphql-tag'

export default gql`
  query GetUserData($id: ID) {
    User(id: $id) {
      id
      name
      email
      transactions {
        id
        description
        date
        amount
        currency
        memo
      }
    }
  }
`
