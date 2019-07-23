import React from 'react'
import { Query, withApollo } from 'react-apollo'
import CssBaseline from '@material-ui/core/CssBaseline'
import Login from './auth/Login'
import FetchUserData from './data/FetchUserData'
import AppRoutes from './AppRoutes'
import AppHeader from './AppHeader'
import Loader from './system/Loader'
import ErrorPage from './system/Error'
import '../index.css';

import { LOGGED_IN_USER } from '../graphql/queries'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modals: {
        transaction: {
          isOpen: false,
          crud: '',
        }
      }
    }
    this.locals = {
      lastPage: null,
    }
    this.setLocals = this.setLocals.bind(this);
    this.openTransactionModal = this.openTransactionModal.bind(this);
  }

  // auth
  _logout(history) {
    console.log('logout')
    localStorage.removeItem('graphcoolToken');
    window.location.href = '/';
  }

  // handlers
  setLocals(x){
    Object.assign(this.locals, x);
  }

  openTransactionModal(crud){
    this.setState({
      modals: {
        ...this.state.modals,
        transaction: {
          isOpen: !!crud,
          crud,
        }
      }
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
          openTransactionModal={this.openTransactionModal}
          handlers={{
            openTransactionModal: this.openTransactionModal,
          }}
          locals={this.locals}
          setLocals={this.setLocals}
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
            if (loading) return <Loader message='Authenticating...' />;
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
