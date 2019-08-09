import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import ListIcon from '@material-ui/icons/List'
import FriendsIcon from '@material-ui/icons/SupervisedUserCircle'
import TimelineIcon from '@material-ui/icons/Timeline'

function NavBottom(props) {
  const route = props.location.pathname.slice(1)
  return (
    <div className="Nav">
      <BottomNavigation value={route} showLabels>
        {renderAction('friends', <FriendsIcon />)}
        {renderAction('transactions', <ListIcon />)}
        {renderAction('summary', <TimelineIcon />)}
      </BottomNavigation>
    </div>
  );
  //render helpers
  function renderAction(path, icon){
    return (
      <BottomNavigationAction
        value={path}
        label={capitalize(path)}
        icon={icon}
        component={Link}
        to={`/${path}`}
        disableRipple
        disabled={props.location.pathname === `/${path}`}
      />
    );
  }
}

// external helpers
function capitalize(str){
  return str[0].toUpperCase() + str.slice(1);
}

export default withRouter(NavBottom);
