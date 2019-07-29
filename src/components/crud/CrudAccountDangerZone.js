import React from 'react'
import { withApollo, Mutation } from 'react-apollo'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import { useTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles(theme => ({
  DangerZone_root: {
    width: '100%',
  },
  deleteButton: {
    marginTop: theme.spacing(2),
    color: theme.palette.error.light,
    borderColor: theme.palette.error.light,
    '&:hover':{
      color: theme.palette.common.white,
      backgroundColor: theme.palette.error.light,
    }
  },
  listItemCentered: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

function DangerZone(props){
  const classes = useStyle(useTheme());

  return (
    <div className={classes.DangerZone_root}>
      <DeleteButton text='Delete all transactions' handler={()=>console.log('delete transactions')} />
      <DeleteButton text='Delete Account' handler={()=>console.log('delete account')} />
    </div>
  );

  // render helpers
  function DeleteButton(props){
    return (
      <div className={classes.listItemCentered}>
        <Button variant='outlined' onClick={props.handler} className={classes.deleteButton}>
          {props.text}
        </Button>
      </div>
    );
  }
}

export default withApollo(DangerZone);
