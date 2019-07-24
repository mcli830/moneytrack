import gql from 'graphql-tag'

export const ADD_TRANSACTION_MUTATION = gql`
  mutation AddTransaction(
    $creatorId: ID!
    $description: String!
    $amount: Int!
    $date: DateTime!
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
export const UPDATE_TRANSACTION_MUTATION = gql`
  mutation UpdateTransaction(
    $id: ID!
    $description: String!
    $amount: Int!
    $date: DateTime!
    $memo: String
  ) {
    updateTransaction(
      id: $id
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
export const DELETE_TRANSACTION_MUTATION = gql`
  mutation DeleteTransaction(
    $id: ID!
  ) {
    deleteTransaction(
      id: $id
    ) {
      id
      description
      date
    }
  }
`
