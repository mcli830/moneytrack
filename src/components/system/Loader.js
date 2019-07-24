import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import blue from '@material-ui/core/colors/blue'

export default (props) => {
  const styles = {
    root: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    message: {
      color: blue[800],
      textAlign: 'center',
      marginTop: 16
    }
  }
  return(
    <div style={styles.root}>
      <CircularProgress size={props.size} thickness={props.thickness} color={props.color} />
      {props.message && <Typography style={styles.message}>{props.message}</Typography>}
    </div>
  )
}
