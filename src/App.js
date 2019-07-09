import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import Nav from './components/Nav.js';
import './index.css';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant="h3">
          Hello World!
        </Typography>
      </Container>
      <Nav />
    </div>
  );
}

export default App;
