import React from 'react'
import PropTypes from 'prop-types'
import { Swipeable } from 'react-swipeable'

function SwipeableViews(props) {

  const { delta, disableTouch, trackMouse } = props;
  const config = {
    delta,
    trackMouse,
    trackTouch: !disableTouch,
  };

  const centerRef = React.useRef();
  const viewCount = props.children.length;
  const [view, setView] = React.useState(0);
  const [swiping, setSwiping] = React.useState(false);
  const [scrolling, setScrolling] = React.useState(false);
  const [pos, setPos] = React.useState(0);

  function handleSwiping(e){
    if (e.absY > e.absX) {
      if (scrolling) return;
      return setScrolling(true);
    }
    if (!scrolling) {
      setSwiping(true);
      setPos(
        ((e.deltaX < 0 && view === 0) || (e.deltaX > 0 && view === viewCount-1))
        ? e.deltaX*0.1
        : e.deltaX
      );
      if (props.onSwiping) props.onSwiping(view, pos);
    }
  }

  function handleSwiped(e){
    if (swiping) {
      setSwiping(false);
    }
    if (scrolling){
      setScrolling(false);
    }
    const rect = centerRef.current.getBoundingClientRect();
    if (Math.abs(pos) > rect.width*0.5){
      if (pos > 0) {
        setView(view+1);
      } else {
        setView(view-1);
      }
    }
    setPos(0);
    if (props.onSwiped) props.onSwiped(view);
  }

  const styles = {
    root: {
      height: '100%',
      maxHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      width: '100%',
      position: 'relative',
    },
    viewContainer: {
      flex: '1 1 auto',
      position: 'relative',
      overflowX: 'hidden',
      overflowY: 'scroll',
      ...props.containerStyle,
      transition: 'opacity 150ms',
      opacity: swiping ? 0.3 : 1,
    },
    view: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: 0,
      transition: swiping ? 'none' : 'right 200ms cubic-bezier(0.23, 1, 0.32, 1)'
    },
    center: {
      right: swiping ? pos : 0,
    },
    left: {
      right: swiping ? `calc(100% + ${pos}px)` : '100%',
    },
    right: {
      right: swiping ? `calc(-100% + ${pos}px)` : '-100%',
    }
  }

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        {React.cloneElement(props.headerComponent, { view, pos, swiping })}
      </div>
      <Swipeable
        {...config}
        onSwiping={handleSwiping}
        onSwiped={handleSwiped}
        style={styles.viewContainer}
        >
        {props.children.map((elem, index) => {
          switch(index){
            case view:
              return React.cloneElement(elem, {
                ref: centerRef,
                style: Object.assign(elem.style ? elem.style : {}, styles.view, styles.center)
              });
            case view-1:
              return React.cloneElement(elem, {
                style: Object.assign(elem.style ? elem.style : {}, styles.view, styles.left)
              });
            case view+1:
              return React.cloneElement(elem, {
                style: Object.assign(elem.style ? elem.style : {}, styles.view, styles.right)
              });
            default:
              return null;
          }
        })}
      </Swipeable>
    </div>
  );
}

SwipeableViews.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  useParentState: PropTypes.bool,
  delta: PropTypes.number,
  disableTouch: PropTypes.bool,
  disableMouse: PropTypes.bool,
  onSwiping: PropTypes.func,
  onSwiped: PropTypes.func,
  containerStyle: PropTypes.object,
}

SwipeableViews.defaultProps = {
  useParentState: false,
  delta: 5,
  disableTouch: false,
  trackMouse: false,
  containerStyle: {},
}

export default SwipeableViews;