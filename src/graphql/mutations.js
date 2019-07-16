import gql from 'graphql-tag'

export const ADD_TRANSACTION_MUTATION = gql`
  mutation AddTransaction(
    $creatorId: ID!
    $description: String!
    $amount: Int!
    $date: DateTime!,
    $memo: String
  ) {
    createTransaction(
      creatorId: $creatorId
      description: $description
      amount: $amount
      date: $date
      memo: $memo
    ) {
      id
      date
      amount
      description
      memo
      creator {
        id
        name
      }
    }
  }
`
