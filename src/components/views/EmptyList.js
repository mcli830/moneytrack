import React from 'react'
import Typography from '@material-ui/core/Typography'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  }
}

export default () => (
  <div style={styles.root}>
    <Typography color='textSecondary'>
      {'Add a transaction with the + button'}
    </Typography>
  </div>
);
