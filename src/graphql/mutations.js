import gql from 'graphql-tag'

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser(
    $id: ID!
    $name: String
    $email: String
    $currency: Currency
  ) {
    updateUser(
      id: $id
      name: $name
      email: $email
      currency: $currency
    ) {
      id
      name
      email
      currency
    }
  }
`

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser(
    $id: ID!
  ) {
    deleteUser (
      id: $id
    ) {
      id
      name
      email
    }
  }
`

export const ADD_TRANSACTION_MUTATION = gql`
  mutation AddTransaction(
    $creatorId: ID!
    $category: Category
    $description: String!
    $amount: Int!
    $date: DateTime!
    $memo: String
  ) {
    createTransaction(
      creatorId: $creatorId
      category: $category
      description: $description
      amount: $amount
      date: $date
      memo: $memo
    ) {
      id
      date
      category
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
    $category: Category
    $description: String!
    $amount: Int!
    $date: DateTime!
    $memo: String
  ) {
    updateTransaction(
      id: $id
      category: $category
      description: $description
      amount: $amount
      date: $date
      memo: $memo
    ) {
      id
      date
      category
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
      category
      description
      date
    }
  }
`
