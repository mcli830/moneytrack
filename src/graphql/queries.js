import gql from 'graphql-tag'

export const LOGGED_IN_USER = gql`
  query LoggedInUserQuery {
    loggedInUser {
      id
    }
  }
`
export const GET_USER_DATA = gql`
  query GetUserData($id: ID) {
    User(id: $id) {
      id
      name
      email
      currency
      transactions {
        id
        category
        description
        date
        amount
        memo
      }
    }
  }
`
