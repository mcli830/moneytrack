import gql from 'graphql-tag'

export default gql`
  query AllUsersQuery {
    allUsers {
      id,
      email,
      name
    }
  }
`
