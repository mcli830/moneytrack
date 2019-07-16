import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export default (props) => {
  const style = {
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
  }
  return(
    <div className="Spinner" style={style}>
      <CircularProgress size={props.size} thickness={props.thickness} />
    </div>
  )
}
