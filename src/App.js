import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import Nav from './components/Nav.js';
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
        <Container maxWidth="md">
          <Typography variant="h3">
            Hello World!
          </Typography>
        </Container>
        <Nav view={this.state.view} changeView={this.changeView} />
      </div>
    );
  }
}

export default App;
