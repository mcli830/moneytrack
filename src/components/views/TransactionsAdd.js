import React from 'react'
import Modal from '@material-ui/core/Modal'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme();

const useStyles = makeStyles({
  container: {
    height: '100%',
    padding: '0'
  }
})

export default (props) => {
  const classes = useStyles();
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      disableAutoFocus
    >
      <Container maxWidth='md' className={classes.container}>
        <Paper className={classes.root}>
          <Typography variant='h4'>
            Add Transaction
          </Typography>
        </Paper>
      </Container>
    </Modal>
  );
}
