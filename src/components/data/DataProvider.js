import React from 'react'
import { withApollo } from 'react-apollo'
import { LOGGED_IN_USER } from '../../graphql/queries'
import { GET_USER_DATA } from '../../graphql/queries'

function DataProvider(props) {

  // get user data from apollo cache
  const { loggedInUser } = props.client.cache.readQuery({
    query: LOGGED_IN_USER
  })
  const { User } = props.client.cache.readQuery({
    query: GET_USER_DATA,
    variables: { id: loggedInUser.id }
  });

  return React.cloneElement(props.children, { data: {
    user: User
  }});
}

export default withApollo(DataProvider)
