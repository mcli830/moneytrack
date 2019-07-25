import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

function Loader(props) {
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
      textAlign: 'center',
      marginTop: 16
    }
  }
  return(
    <div style={styles.root}>
      <CircularProgress size={props.size} thickness={props.thickness} color={props.color || 'primary'} />
      {props.message && <Typography color={props.color || 'primary'} style={styles.message}>{props.message}</Typography>}
    </div>
  )
}

export default Loader;
