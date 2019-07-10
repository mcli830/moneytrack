import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppHeader from './components/AppHeader';
import Login from './components/auth/Login';
// import ViewWrapper from './components/ViewWrapper';
import Account from './components/views/Account';
import Transactions from './components/views/Transactions';
import Friends from './components/views/Friends';
import Timeline from './components/views/Timeline';
import NavBottom from './components/NavBottom';
import './index.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      view: 'account'
    }
    this.changeView = this.changeView.bind(this);
  }

  changeView(view){
    this.setState({ view })
  }

  render(){
    return (
      <div className="App">
        <CssBaseline />
        <Router>
          <AppHeader />
          <div className="ViewWrapper">
            <Route exact path='/' component={Login} />
            <Route path='/account' component={Account} />
            <Route path='/transactions' component={Transactions} />
            <Route path='/friends' component={Friends} />
            <Route path='/timeline' component={Timeline} />
          </div>
          <NavBottom
            view={this.state.view}
            changeView={this.changeView}
          />
        </Router>
      </div>
    );
  }
}

export default App;
