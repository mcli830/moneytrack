import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { useTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import SettingsIcon from '@material-ui/icons/Settings'
import AddIcon from '@material-ui/icons/Add'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import EmptyIcon from './system/EmptyIcon'
// import UserMenu from './UserMenu'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  header: {
    color: theme.palette.background.default,
    fontFamily: 'Kaushan Script, sans-serif',
    padding: '0.5em 0',
    textAlign: 'center',
  },
  text: {
    color: theme.palette.background.default,
    padding: '0.5em 0',
    textAlign: 'center',
  },
  button: {
    padding: theme.spacing(2),
    color: theme.palette.background.default
  },
}));

function capitalize(str){
  return str[0].toUpperCase() + str.slice(1);
}

function UserHeader(props) {
  const classes = useStyles(useTheme());
  // menu anchor state
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // menu handlers
  // function handleOpenMenu(e) {
  //   setAnchorEl(e.currentTarget);
  // }
  // function handleCloseMenu(){
  //   setAnchorEl(null);
  // }
  // navigation handler
  function handleBackButton(){
    const exitTime = 100;
    if (props.history.length > 1){
      props.setAccountSlide({
        in: false,
        timeout: exitTime,
      });
      return setTimeout(()=>{
        props.history.goBack();
        props.setAccountSlide({
          in: true,
          timeout: 300,
        });
      }, exitTime)
    } else {
      props.history.replace('/transactions')
    }
  }

  // render
  return props.history.location.pathname !== '/' && (
    <div className={classes.root}>
      <Container maxWidth='sm' className={classes.container}>
        {props.history.location.pathname !== '/account' ? (
          <Link to='/account'>
            <IconButton className={classes.button}>
              <SettingsIcon />
            </IconButton>
          </Link>
        ) : (
          <IconButton onClick={handleBackButton} className={classes.button}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h4" className={classes.header}>
          {capitalize(props.history.location.pathname.slice(1))}
        </Typography>
        {props.history.location.pathname !== '/account' ? (
          <IconButton onClick={props.openTransactionModal} className={classes.button}>
            <AddIcon />
          </IconButton>
        ) : <IconButton disabled><EmptyIcon /></IconButton>}
      </Container>
    </div>
  );

  // internal render helper
  // function renderUserMenu(){
  //   return (
  //     <UserMenu
  //       data={props.data}
  //       anchorEl={anchorEl}
  //       handleOpen={handleOpenMenu}
  //       handleClose={handleCloseMenu}
  //       logout={props.logout}
  //     />
  //   );
  // }
}

export default withRouter(UserHeader);
