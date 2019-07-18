import React from 'react';
import { Swipeable } from 'react-swipeable'
import { createMuiTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'

const theme = createMuiTheme({});
const motionBuffer = 0.1;
const limit = theme.spacing(12);
const snapZone = 0.7;

const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  left: {
    position: 'absolute',
    height: '100%',
    width: theme.spacing(12),
    left: 0,
    zIndex: 0,
  },
  right: {
    position: 'absolute',
    height: '100%',
    width: theme.spacing(12),
    right: 0,
    zIndex: 0,
  }
})

export default props => {
  const classes = useStyles();

  const config = {
    delta: 3,
    trackTouch: true,
    trackMouse: true
  }

  const [pos, setPos] = React.useState(0);

  function handleSwiping(e){
    props.setActive();
    if (props.active){
      const d = pos + e.deltaX*motionBuffer;
      setPos(d > limit ? limit
        : d < limit*-1 ? limit*-1
        : d);
    }
  }
  function handleSwiped(e){
    if (props.active){
      setPos(pos > limit*snapZone ? limit
        : pos < limit*snapZone*-1 ? limit*-1
        : 0 );
    }
  }

  return (
    <Swipeable
      {...config}
      onSwiping={handleSwiping}
      onSwiped={handleSwiped}
      className={classes.root}
    >
      <div className={classes.left}>
        {props.left}
      </div>
      <div className={classes.right}>
        {props.right}
      </div>
      {React.cloneElement(props.children, {
        style: {
          zIndex: 1,
          transform: props.active ? `translate(${pos*-1}px, 0)` : 'none'
        }
      })}
    </Swipeable>
  );

}
