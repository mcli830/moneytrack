import React from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { useTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import AddIcon from '@material-ui/icons/Add'
import FaceIcon from '@material-ui/icons/Face'
import SettingsIcon from '@material-ui/icons/Settings'
import AccountIcon from '@material-ui/icons/AccountBox'
import PowerIcon from '@material-ui/icons/PowerSettingsNew'

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
  menu: {
    padding: theme.spacing(1,2),
    '& > li': {
      padding: theme.spacing(0,4,0,2),
      '&:hover .MuiListItemIcon-root': {
        color: theme.palette.primary.light,
        '&#logout-icon': {
          color: theme.palette.error.light,
        }
      },
    },
  },
  listItemIcon: {
    minWidth: 0,
    marginRight: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(0.5, 0),
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
    borderRadius: '50%',
    width: 'auto',
    height: 'auto',
    padding: theme.spacing(2),
  },
  icon: {
    color: theme.palette.background.default
  }
}));

function capitalize(str){
  return str[0].toUpperCase() + str.slice(1);
}

function UserHeader(props) {
  const classes = useStyles(useTheme());
  // menu anchor state
  const [anchorEl, setAnchorEl] = React.useState(null);
  // menu handlers
  function handleOpenMenu(e) {
    setAnchorEl(e.currentTarget);
  }
  function handleCloseMenu(){
    setAnchorEl(null);
  }
  // render
  return props.history.location.pathname !== '/' && (
    <div className={classes.root}>
      <Container maxWidth='sm' className={classes.container}>
        {renderLeft()}
        {renderCenter()}
        {renderRight()}
      </Container>
    </div>
  );

  // internal helpers
  // render left menu button
  function renderLeft(){
    return (
      <div id='account-menu-container'>
        <Button onClick={handleOpenMenu} className={classes.button} aria-controls='account-menu'>
          <MenuIcon className={classes.icon} />
        </Button>
        <Menu
          id='account-menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          keepMounted
          MenuListProps={{className: classes.menu}}
        >
          <MenuItem disabled>
            <ListItemIcon className={classes.listItemIcon}><FaceIcon /></ListItemIcon>
            <ListItemText>{props.data.user.name}</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon className={classes.listItemIcon}><SettingsIcon /></ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon className={classes.listItemIcon}><AccountIcon /></ListItemIcon>
            <ListItemText>Account</ListItemText>
          </MenuItem>
          <Divider className={classes.divider} />
          <MenuItem onClick={props.logout}>
            <ListItemIcon id='logout-icon' className={classes.listItemIcon}><PowerIcon /></ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </div>
    );
  }
  // render center header
  function renderCenter(){
    return (
      <Typography variant="h4" className={classes.header}>
        {capitalize(props.history.location.pathname.slice(1))}
      </Typography>
    );
  }
  // render right add button
  function renderRight(){
    return (
      <Button onClick={props.openTransactionModal} className={classes.button}>
        <AddIcon className={classes.icon} />
      </Button>
    );
  }
}

export default withRouter(UserHeader);
