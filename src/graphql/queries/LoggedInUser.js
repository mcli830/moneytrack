import gql from 'graphql-tag'

export default gql`
  query LoggedInUserQuery {
    loggedInUser {
      id
    }
  }
`
