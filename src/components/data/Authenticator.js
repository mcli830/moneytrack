import React from 'react'
import PropTypes from 'prop-types'
import { Query, withApollo } from 'react-apollo'
import Loader from '../system/Loader'
import ErrorPage from '../system/Error'
import { LOGGED_IN_USER } from '../../graphql/queries'

function Authenticator(props){
  return (
    <Query query={LOGGED_IN_USER}>
      {({ data, loading, error}) => {
        if (loading) return <Loader message='Initiating...' />;
        if (error) {
          console.error(error);
          return <ErrorPage message='Oops! Something went wrong with the server. Check the console for more information.' />
        }
        if (data.loggedInUser && data.loggedInUser.id !== null){
          return props.onLoggedIn(data.loggedInUser.id);
        }
        return props.onLoggedOff();
      }}
    </Query>
  );
}

Authenticator.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  onLoggedOff: PropTypes.func.isRequired,
}

export default withApollo(Authenticator);
