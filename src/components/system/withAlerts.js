import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'
import amber from '@material-ui/core/colors/amber'
import green from '@material-ui/core/colors/green'
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'
import yellow from '@material-ui/core/colors/yellow'

const style = theme => ({
  base: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 600,
  },
  primary: {
    color: theme.palette.primary.light,
  },
  secondary: {
    color: theme.palette.secondary.main,
  },
  tertiary: {
    color: amber[500],
  },
  success: {
    color: green[500],
  },
  blue: {
    color: blue[500],
  },
  warn: {
    color: yellow[500],
  },
  error: {
    color: red[400],
  },
  grey: {
    color: theme.palette.grey[500],
  },
  white: {
    color: theme.palette.common.white,
  }
});

export default function withAlerts(WrappedComponent){

  class ComponentWithAlerts extends React.Component {

    queue = [];

    state = {
      open: false,
    }

    notification = ({message, color, icon})  => {
      this.queue.push({
        message,
        color,
        icon,
        key: new Date().getTime(),
      });

      if (this.state.open){
        // dismiss current message to show new one
        this.setState({ open: false })
      } else {
        this.processQueue();
      }
    };

    processQueue = () => {
      if (this.queue.length > 0){
        this.setState({
          alert: this.queue.shift(),
          open: true,
        })
      }
    };

    handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({ open: false });
    }

    handleExited = () => {
      this.processQueue();
    }

    render(){
      const { classes } = this.props;
      const { alert = {} } = this.state;
      const msgColor = alert.color ? alert.color : 'grey';

      return (
        <React.Fragment>
          <ControlledUpdate>
              <WrappedComponent
                alerts={{
                  notification: this.notification,
                }}
                {...this.props}
              />
            </ControlledUpdate>
          <Snackbar
            key={alert.key}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.open}
            autoHideDuration={3000}
            onClose={this.handleClose}
            onExited={this.handleExited}
            className={classes[msgColor]}
            message={<span className={classes.base + ' ' + classes[msgColor]}>{alert.message}</span>}
            action={(
              <IconButton
                key='close'
                color='inherit'
                onClick={alert.icon ? null : this.handleClose}
                className={classes.base + (alert.icon ? ' '+classes[msgColor] : ' '+classes.grey)}
              >
                {alert.icon ? alert.icon : <CloseIcon />}
              </IconButton>
            )}
          />
        </React.Fragment>
      )
    }
  }

  class ControlledUpdate extends React.Component {
    shouldComponentUpdate(){
      // prevent the rest of the app from updating when alerts are used
      return false;
    }
    render(){
      return this.props.children;
    }
  }

  return withStyles(style)(ComponentWithAlerts);
}
