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
  const [view, setView] = React.useState(props.startingView);
  const [swiping, setSwiping] = React.useState(false);
  const [scrolling, setScrolling] = React.useState(false);
  const [pos, setPos] = React.useState(0);

  function handleSwiping(e){
    if (e.absY > e.absX) {
      if (scrolling) return;
      return setScrolling(true);
    }
    if (!scrolling) {
      e.event.preventDefault();
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
    var nextView = view;
    if (e.velocity > 2 && view > 0 && view < viewCount-1) {
      if (e.deltaX > 0) {
        nextView = view+1;
      } else {
        nextView = view-1;
      }
    } else {
      const rect = centerRef.current.getBoundingClientRect();
      if (Math.abs(pos) > rect.width*0.5){
        if (pos > 0) {
          nextView = view+1;
        } else {
          nextView = view-1;
        }
      }
    }
    if (nextView !== view) setView(nextView);
    setPos(0);
    if (props.onSwiped) props.onSwiped(nextView);
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
      minHeight: 'calc(100vh - 161px)',
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
        {props.headerComponent({ view, pos, swiping, setView })}
      </div>
      <Swipeable
        {...config}
        onSwiping={handleSwiping}
        onSwiped={handleSwiped}
        style={styles.viewContainer}
      >
        {props.children.map((renderChild, index) => {
          switch(index){
            case view:
              return renderChild({
                ref: centerRef,
                style: Object.assign({}, styles.view, styles.center),
              });
            case view-1:
              return renderChild({
                style: Object.assign({}, styles.view, styles.left),
              });
            case view+1:
              return renderChild({
                style: Object.assign({}, styles.view, styles.right),
              })
            default:
              return null;
          }
        })}
      </Swipeable>
    </div>
  );
}

SwipeableViews.propTypes = {
  children: PropTypes.arrayOf(PropTypes.func),
  headerComponent: PropTypes.func,
  useParentState: PropTypes.bool,
  delta: PropTypes.number,
  disableTouch: PropTypes.bool,
  disableMouse: PropTypes.bool,
  onSwiping: PropTypes.func,
  onSwiped: PropTypes.func,
  containerStyle: PropTypes.object,
  startingView: PropTypes.number,
}

SwipeableViews.defaultProps = {
  useParentState: false,
  delta: 5,
  disableTouch: false,
  trackMouse: false,
  containerStyle: {},
  startingView: 0,
}

export default SwipeableViews;
