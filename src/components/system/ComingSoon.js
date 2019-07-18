import React from 'react'
import Typography from '@material-ui/core/Typography'
import TimerIcon from '@material-ui/icons/Timer'

export default (props) => {
  const styles = {
    root: {
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
  }
  return(
    <div style={styles.root}>
      <div style={styles.column}>
        <TimerIcon fontSize='large' />
        <Typography variant='subtitle1'>
          Coming Soon
        </Typography>
      </div>
    </div>
  )
}
