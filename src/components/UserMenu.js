import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import MenuIcon from '@material-ui/icons/Menu'
import FaceIcon from '@material-ui/icons/Face'
import SettingsIcon from '@material-ui/icons/Settings'
import AccountIcon from '@material-ui/icons/AccountCircle'
import PowerIcon from '@material-ui/icons/PowerSettingsNew'
import { makeStyles } from '@material-ui/styles'
import { useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
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
  button: {
    borderRadius: '50%',
    width: 'auto',
    height: 'auto',
    padding: theme.spacing(2),
  },
  icon: {
    color: theme.palette.background.default
  }
}))

function UserMenu(props){
  const classes = useStyles(useTheme());
  return (
    <div id='account-menu-container'>
      <Button onClick={props.handleOpen} className={classes.button} aria-controls='account-menu'>
        <MenuIcon className={classes.icon} />
      </Button>
      <Menu
        id='account-menu'
        anchorEl={props.anchorEl}
        open={Boolean(props.anchorEl)}
        onClose={props.handleClose}
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

UserMenu.propTypes = {
  data: PropTypes.object,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}

export default UserMenu;
