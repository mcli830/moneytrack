import React from 'react'
import { Query, withApollo } from 'react-apollo'
import CssBaseline from '@material-ui/core/CssBaseline'
import Login from './components/auth/Login'
import FetchUserData from './components/FetchUserData'
import AppRoutes from './components/AppRoutes'
import AppHeader from './components/AppHeader'
import Loader from './components/Loader'
import ErrorPage from './components/Error'
import './index.css';

import { LOGGED_IN_USER } from './graphql/queries'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      addTransactionModal: false
    }
    this.handleAddTransactionModal = this.handleAddTransactionModal.bind(this);
  }

  // auth
  _logout(history) {
    console.log('logout')
    localStorage.removeItem('graphcoolToken');
    window.location.href = '/';
  }

  // handlers
  handleAddTransactionModal(bool){
    this.setState({
      addTransactionModal: bool
    });
  }

  // render
  _renderLogin = () => {
    return (
      <React.Fragment>
        <AppHeader />
        <div className="ViewWrapper">
          <Login />
        </div>
      </React.Fragment>
    );
  }

  _fetchDataAndRenderRoutes = id => {
    return (
      <FetchUserData variables={{ id }}>
        <AppRoutes
          state={this.state}
          handleAddTransactionModal={this.handleAddTransactionModal}
          logout={this._logout}
        />
      </FetchUserData>
    )
  }

  render(){
    return (
      <div className="App">
        <CssBaseline />
        <Query query={LOGGED_IN_USER}>
          {({ data, loading, error}) => {
            if (loading) return <Loader />;
            if (error) return <ErrorPage message={error.message} />
            if (data.loggedInUser && data.loggedInUser.id !== null){
              return this._fetchDataAndRenderRoutes(data.loggedInUser.id);
            }
            return this._renderLogin();
          }}
        </Query>
      </div>
    );
  }
}

export default withApollo(App);

// export default graphql(LOGGED_IN_USER_QUERY, {
//   name: 'loggedInUserQuery',
//   options: {fetchPolicy: 'network-only'}
// })(App);
