import React from 'react'
import Typography from '@material-ui/core/Typography'
import TimerIcon from '@material-ui/icons/Timer'
import { withTheme } from '@material-ui/core/styles'

export default withTheme((props) => {
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
    },
    icon: {
      color: props.theme.palette.text.secondary,
    }
  }
  return(
    <div style={styles.root}>
      <div style={styles.column}>
        <TimerIcon fontSize='large' style={styles.icon} />
        <Typography variant='subtitle1' color='textSecondary'>
          Coming Soon
        </Typography>
      </div>
    </div>
  )
})
