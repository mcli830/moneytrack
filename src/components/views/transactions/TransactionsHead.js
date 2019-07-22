import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme();


const useStyles = makeStyles({
  root: {
    margin: 0,
    width: '100%',
    height: theme.spacing(4),
    backgroundColor: theme.palette.grey[200],
    position: 'relative',
    overflow: 'hidden',
  },
  rootOverlay: {
    position: 'absolute',
    zIndex: 2,
    pointerEvents: 'none',
    height: '100%',
    width: '100%',
    background: `linear-gradient(90deg, ${theme.palette.grey[200]}, transparent 30%, transparent 70%, ${theme.palette.grey[200]})`
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
    // transition: `${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeOut}`
    // transition: '200ms cubic-bezier(0.23, 1, 0.32, 1)',
  },
  month: {
    color: theme.palette.primary.main,
  },
});

export default (props) => {
  const classes = useStyles();
  const offset = props.pos*0.33;

  const styles = {
    transition: { transition: props.swiping ? 'none' : '200ms cubic-bezier(0.23, 1, 0.32, 1)' },
    l2: { right: `calc(100% + ${offset}px)`, opacity: 0.5 },
    l1: { right: `calc(66.66% + ${offset}px)`, opacity: 0.5},
    c: { right: `calc(33.33% + ${offset}px)`},
    r1: { right: offset+'px', opacity: 0.5},
    r2: { right: `calc(-33.33% + ${offset}px)`, opacity: 0.5},
  }

  // rendering the subcomponent via function instead of functional component allows css transition
  function renderMonth({ key, name, position }) {
    return (
      <div key={key} className={classes.column} style={Object.assign({}, styles[position], styles.transition)}>
        <Typography variant='button' className={classes.month}>
          {name}
        </Typography>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {props.months.map((month, index) => {
        switch(index){
          case props.view-2:
            return renderMonth({key: index, name: month, position:'l2' });
          case props.view-1:
            return renderMonth({key: index, name: month, position:'l1' });
          case props.view:
            return renderMonth({key: index, name: month, position:'c' });
          case props.view+1:
            return renderMonth({key: index, name: month, position:'r1' });
          case props.view+2:
            return renderMonth({key: index, name: month, position:'r2' });
          default:
            return null;
        }
      })}
      <div className={classes.rootOverlay} />
    </div>
  );
}
