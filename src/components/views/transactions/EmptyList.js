import React from 'react'
import Typography from '@material-ui/core/Typography'

const styles = {
  root: {
    display: 'block',
    textAlign: 'center',
    height: '100%',
  },
  text: {
    marginTop: '50%',
    transform: 'translate(0, -50%)'
  }
}

export default () => (
  <div style={styles.root}>
    <Typography variant='body1' style={styles.text}>
      {'Add a transaction with the + button'}
    </Typography>
  </div>
);
