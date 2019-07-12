import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import AppHeader from './AppHeader'

export default props => {
  const styles = {
    root: {
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    message: {
      width: 400,
      maxWidth: '90%',
      height: 'auto'
    }
  }
  return (
    <div className="Error" style={styles.root}>
      <AppHeader />
      <Paper style={styles.message}>
        <Typography variant='h3'>Error!</Typography>
        <Typography variant='body1'>
          {this.props.message}
        </Typography>
      </Paper>
    </div>
  );
}
