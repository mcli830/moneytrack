import React from 'react'
import { Query, withApollo } from 'react-apollo'

import Loader from './Loader'
import ErrorPage from './Error'

import GET_USER_DATA from '../graphql/queries/GetUserData'

class DataWrapper extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: null
    }
  }

  render(){
    return (
      <Query query={GET_USER_DATA} variables={this.props.variables}>
      {({ data, loading, error}) => {
        if (loading) return <Loader />;
        if (error) return <ErrorPage message={error.message} />;
        this.props.covertState({ user: data.User })
        return this.props.children;
      }}
      </Query>
    );
  }
}

export default withApollo(DataWrapper)
