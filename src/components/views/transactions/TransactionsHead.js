import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => {
  const headerColor = theme.palette.grey[200];
  return {
    root: {
      margin: 0,
      width: '100%',
      height: theme.spacing(4),
      backgroundColor: headerColor,
      position: 'relative',
      overflow: 'hidden',
    },
    rootOverlay: {
      position: 'absolute',
      zIndex: 2,
      pointerEvents: 'none',
      height: '100%',
      width: '100%',
      background: `linear-gradient(90deg, ${headerColor}, transparent 30%, transparent 70%, ${headerColor})`
    },
    column: {
      position: 'absolute',
      zIndex: 1,
      height: '100%',
      width: '33.33%',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      userSelect: 'none',
      opacity: 0.5,
      cursor: 'pointer',
      '&:hover': {
        opacity: 1,
      },
    },
    month: {
      color: theme.palette.primary.main,
    }
  }
});

export default (props) => {
  const classes = useStyles(useTheme());
  const offset = props.pos*0.33;

  const styles = {
    transition: { transition: props.swiping ? 'none' : '200ms cubic-bezier(0.23, 1, 0.32, 1)' },
    l2: { right: `calc(100% + ${offset}px)` },
    l1: { right: `calc(66.66% + ${offset}px)`},
    c: { right: `calc(33.33% + ${offset}px)`, opacity: 1, cursor: 'auto'},
    r1: { right: offset+'px'},
    r2: { right: `calc(-33.33% + ${offset}px)`},
  }

  return (
    <div className={classes.root}>
      {props.months.map((month, index) => {
        switch(index){
          case props.view-2:
            return renderMonth({key: index, name: month, position:'l2', nextView: index});
          case props.view-1:
            return renderMonth({key: index, name: month, position:'l1', nextView: index});
          case props.view:
            return renderMonth({key: index, name: month, position:'c'});
          case props.view+1:
            return renderMonth({key: index, name: month, position:'r1', nextView: index});
          case props.view+2:
            return renderMonth({key: index, name: month, position:'r2', nextView: index});
          default:
            return null;
        }
      })}
      <div className={classes.rootOverlay} />
    </div>
  );

  // internal helper
  // rendering the subcomponent via function instead of functional component allows css transition
  function renderMonth({ key, name, position, nextView }) {
    return (
      <div
        key={key}
        className={classes.column}
        style={Object.assign({}, styles[position], styles.transition)}
        onClick={typeof nextView === 'number' ? ()=>props.setView(nextView) : null}
      >
        <Typography variant='button' className={classes.month}>
          {name}
        </Typography>
      </div>
    );
  }
}
