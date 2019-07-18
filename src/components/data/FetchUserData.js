import React from 'react'
import { Query, withApollo } from 'react-apollo'

import Loader from '../system/Loader'
import ErrorPage from '../system/Error'

import { GET_USER_DATA } from '../../graphql/queries'

function FetchUserData(props) {
  return (
    <Query query={GET_USER_DATA} variables={props.variables}>
    {({ data, loading, error}) => {
      if (loading) return <Loader />;
      if (error) return <ErrorPage message={error.message} />;
      return props.children;
    }}
    </Query>
  );
}

export default withApollo(FetchUserData)
