import gql from 'graphql-tag'

export default gql`
  mutation CreateTransaction(
    $creatorId: ID
    $description: String
    $amount: Int
    $currency: Currency,
    $date: DateTime
  ) {
    createTransaction(
      creatorId: $creatorId
      description: $description
      amount: $amount
      currency: $currency
      date: $date
    ) {
      id
      description
      amount
      date
    }
  }
`
