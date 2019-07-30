import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles'

const style = theme => ({
  primary: {
    color: theme.palette.primary.light,
    fontWeight: 'bold',
  },
  secondary: {
    color: theme.palette.secondary.light,
    fontWeight: 'bold',
  },
  error: {
    color: theme.palette.error.light,
    fontWeight: 'bold',
  },
  grey: {
    color: theme.palette.grey[500],
    fontWeight: 'bold',
  }
});

export default function withAlerts(WrappedComponent){

  class ComponentWithAlerts extends React.Component {

    queue = [];

    state = {
      open: false,
    }

    notification = (message, color)  => {
      this.queue.push({
        message,
        color,
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
          <WrappedComponent
            alerts={{
              notification: this.notification,
            }}
            {...this.props}
          />
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
            message={<span className={classes[msgColor]}>{alert.message}</span>}
            action={(
              <IconButton
                key='close'
                color='inherit'
                onClick={this.handleClose}
                className={classes.grey}
              >
                <CloseIcon />
              </IconButton>
            )}
          />
        </React.Fragment>
      )
    }
  }

  return withStyles(style)(ComponentWithAlerts);
}
