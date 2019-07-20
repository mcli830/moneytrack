import React from 'react'
import Grid from '@material-ui/core/Grid'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import { makeStyles, withStyle } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme();

const useStyles = makeStyles({
  root: {
    margin: 0,
    width: '100%',
    backgroundColor: theme.palette.grey[200],
    position: 'relative',
  },
  column: {
    position: 'relative',
    textAlign: 'center',
    padding: '0 !important',
    zIndex: 0,
  },
  button: {
    width: '100%',
    height: '100%',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  month: {
    color: theme.palette.primary.main,
  },
})

export default (props) => {
  const classes = useStyles();
  return (
    <Grid container spacing={1} className={classes.root}>
      <Grid item xs={4} className={classes.column}>
        <ButtonBase className={classes.button}>
          <ChevronLeft />
        </ButtonBase>
      </Grid>
      <Grid item xs={4} className={classes.column}>
        <ButtonBase className={classes.button}>
          <Typography variant='button' className={classes.month}>
            FEB 2019
          </Typography>
        </ButtonBase>
      </Grid>
      <Grid item xs={4} className={classes.column}>
        <ButtonBase className={classes.button}>
          <ChevronRight />
        </ButtonBase>
      </Grid>
    </Grid>
  );
}
