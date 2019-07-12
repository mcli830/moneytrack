import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import AppHeader from './AppHeader'

export default props => {
  const styles = {
    root: {
      height: '100%',
      width: '100%',
    },
    container: {
      flex: '1 1 auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    paper: {
      width: 400,
      maxWidth: '90%',
      height: 'auto',
      marginTop: '5%',
      padding: '1em'
    },
    header: {
      textAlign: 'center'
    },
    message: {
      marginTop: '1em'
    }
  }
  return (
    <div style={styles.root}>
      <AppHeader />
      <Container maxWidth="md" style={styles.container}>
        <Paper style={styles.paper}>
          <Typography variant='h4' style={styles.header}>Error!</Typography>
          <Typography variant='body1' style={styles.message}>
            {props.message}
          </Typography>
        </Paper>
      </Container>
    </div>
  );
}
