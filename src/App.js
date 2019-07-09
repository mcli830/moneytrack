import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import AppHeader from './components/AppHeader';
import ViewWrapper from './components/ViewWrapper';
import Nav from './components/Nav';
import './index.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      view: 'transactions'
    }
    this.changeView = this.changeView.bind(this);
  }

  changeView(viewName){
    this.setState({
      view: viewName
    });
  }

  render(){
    return (
      <div className="App">
        <CssBaseline />
        <AppHeader />
        <ViewWrapper view={this.state.view} />
        <Nav view={this.state.view} changeView={this.changeView} />
      </div>
    );
  }
}

export default App;
