import React from 'react'
import { Query, withApollo } from 'react-apollo'
import Async from 'react-async'
import CssBaseline from '@material-ui/core/CssBaseline'
import Login from './auth/Login'
import FetchUserData from './data/FetchUserData'
import prepareTransactionsData from './data/prepareTransactionsData'
import AppController from './AppController'
import AppHeader from './AppHeader'
import Loader from './system/Loader'
import ErrorPage from './system/Error'
import withAlerts from './system/withAlerts'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
// import blue from '@material-ui/core/colors/blue'
// import green from '@material-ui/core/colors/green'
// import orange from '@material-ui/core/colors/orange'
import '../index.css';
import { LOGGED_IN_USER, GET_USER_DATA } from '../graphql/queries'

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

    const asyncPromiseFn = () => new Promise((resolve, reject) => {
      // get user data from apollo cache
      const { loggedInUser } = this.props.client.readQuery({
        query: LOGGED_IN_USER
      })
      const { User } = this.props.client.readQuery({
        query: GET_USER_DATA,
        variables: { id: loggedInUser.id }
      });

      resolve({
        user: User,
        enhanced: prepareTransactionsData(User),
      });
    })

    return (
      <FetchUserData variables={{ id }}>
        <Async promiseFn={asyncPromiseFn}>
          <Async.Loading>
            <Loader message='Loading...' />
          </Async.Loading>
          <Async.Rejected>
            {error => <ErrorPage message={error.message} />}
          </Async.Rejected>
          <Async.Resolved>
            {data => (
              <AppController
                state={this.state}
                data={data}
                openTransactionModal={this.openTransactionModal}
                handlers={{ openTransactionModal: this.openTransactionModal }}
                locals={this.locals}
                setLocals={this.setLocals}
                logout={this._logout}
                alerts={this.props.alerts}
              />
            )}
          </Async.Resolved>
        </Async>
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

export default withApollo(withAlerts(App));

// export default graphql(LOGGED_IN_USER_QUERY, {
//   name: 'loggedInUserQuery',
//   options: {fetchPolicy: 'network-only'}
// })(App);
