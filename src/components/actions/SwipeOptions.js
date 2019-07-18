import React from 'react'
import PropTypes from 'prop-types'
import { Swipeable } from 'react-swipeable'


function SwipeOptions(props) {

  const { delta, trackTouch, trackMouse } = props;
  const config = { delta, trackTouch, trackMouse };
  const { active, unitSize, motionBuffer, snapZone, left, right } = props;
  const limit = {
    right: right.length * unitSize,
    left: left.length * unitSize * -1,
  }

  const [pos, setPos] = React.useState(0);

  function handleSwiping(e){
    if (props.onSwiping) props.onSwiping();
    const rightLimit = limit.right > 0 ? limit.right : unitSize;
    const leftLimit = limit.left < 0 ? limit.left : unitSize * -1;
    if (active){
      const d = pos + e.deltaX * motionBuffer;
      const dsoft = d*0.5;
      setPos(d > rightLimit ? rightLimit
        : d < leftLimit ? leftLimit
        : (limit.right <= 0 && d > 0) ? dsoft
            : limit.left >= 0 && d < 0 ? dsoft
            : d);
    }
  }
  function handleSwiped(e){
    if (props.onSwiped) props.onSwiped();
    if (active){
      if (e.velocity > 2) {
        if (e.dir === 'Left') {
          return setPos(pos > 0 ? limit.right : 0);
        }
        if (e.dir === 'Right') {
          return setPos(pos < 0 ? limit.left : 0);
        }
      }
      setPos(pos > limit.right * snapZone ? limit.right
        : pos < limit.left * snapZone ? limit.left
        : 0 );
    }
  }

  const styles = {
    root: {
      position: 'relative',
    },
    left: {
      position: 'absolute',
      height: '100%',
      width: left.length * unitSize,
      left: 0,
      display: 'flex',
      flexDirection: 'row',
      zIndex: 0,
    },
    right: {
      position: 'absolute',
      height: '100%',
      width: right.length * unitSize,
      right: 0,
      display: 'flex',
      flexDirection: 'row',
      zIndex: 0,
    },
    option: {
      height: '100%',
      flex: '1 1 auto',
    },
    child: {
      zIndex: 1,
      transform: active ? `translate(${pos*-1}px, 0)` : 'none'
    }
  }

  return (
    <Swipeable
      {...config}
      onSwiping={handleSwiping}
      onSwiped={handleSwiped}
      style={styles.root}
    >
      {left.length > 0 && (
        <div style={styles.left}>
          {left.map((el, i) => React.cloneElement(el, {
            key: 'l' + i,
            style: styles.option
          }))}
        </div>
      )}
      {right.length > 0 && (
        <div style={styles.right}>
          {right.map((el, i) => React.cloneElement(el, {
            key: 'r' + i,
            style: styles.option
          }))}
        </div>
      )}
      {React.cloneElement(props.children, { style: styles.child })}
    </Swipeable>
  );
}

SwipeOptions.propTypes = {
  children: PropTypes.element.isRequired,
  left: PropTypes.arrayOf(PropTypes.element),
  right: PropTypes.arrayOf(PropTypes.element),
  onSwiping: PropTypes.func,
  onSwiped: PropTypes.func,
  delta: PropTypes.number,
  trackTouch: PropTypes.bool,
  trackMouse: PropTypes.bool,
  unitSize: PropTypes.number,
  motionBuffer: PropTypes.number,
  snapZone: PropTypes.number,
  active: PropTypes.bool,
}

SwipeOptions.defaultProps = {
  left: [],
  right: [],
  delta: 4,
  trackTouch: true,
  trackMouse: true,
  unitSize: 64,
  motionBuffer: 0.1,
  snapZone: 0.7,
  active: true,
}

export default SwipeOptions;