import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Friends from './views/Friends';
import Transactions from './views/Transactions';
import Timeline from './views/Timeline';

function ViewWrapper(props){
  return(
    <Container className="ViewWrapper" maxWidth="md">
      {renderView(props.view)}
    </Container>
  );
}

function renderView(view){
  switch(view){
    case 'friends':
      return <Friends />
    case 'transactions':
      return <Transactions />
    case 'timeline':
      return <Timeline />
    default:
      return;
  }
}

export default ViewWrapper;
