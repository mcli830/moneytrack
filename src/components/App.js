import React from 'react'
import { Query, withApollo } from 'react-apollo'
import CssBaseline from '@material-ui/core/CssBaseline'
import Login from './auth/Login'
import FetchUserData from './data/FetchUserData'
import AppController from './AppController'
import AppHeader from './AppHeader'
import Loader from './system/Loader'
import ErrorPage from './system/Error'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
// import blue from '@material-ui/core/colors/blue'
// import green from '@material-ui/core/colors/green'
// import orange from '@material-ui/core/colors/orange'
import '../index.css';
import { LOGGED_IN_USER } from '../graphql/queries'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00587d',
    },
    secondary: {
      main: '#f76638',
    },
  }
});

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modals: {
        transaction: {
          isOpen: false,
          crud: '',
          data: {}
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

  openTransactionModal(crud, o){
    this.setState({
      modals: {
        ...this.state.modals,
        transaction: {
          isOpen: !!crud,
          crud,
          currentId: crud === 'update' ? o.id : null,
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

  _renderApp = id => {
    return (
      <FetchUserData variables={{ id }}>
        <AppController
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
      <ThemeProvider theme={theme}>
        <div className="App">
          <CssBaseline />
          <Query query={LOGGED_IN_USER}>
            {({ data, loading, error}) => {
              if (loading) return <Loader message='Initiating...' />;
              if (error) return <ErrorPage message={error.message} />
              if (data.loggedInUser && data.loggedInUser.id !== null){
                return this._renderApp(data.loggedInUser.id);
              }
              return this._renderLogin();
            }}
          </Query>
        </div>
      </ThemeProvider>
    );
  }
}

export default withApollo(App);

// export default graphql(LOGGED_IN_USER_QUERY, {
//   name: 'loggedInUserQuery',
//   options: {fetchPolicy: 'network-only'}
// })(App);
