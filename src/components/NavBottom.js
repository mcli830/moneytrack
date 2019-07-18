import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import ListIcon from '@material-ui/icons/List'
import FriendsIcon from '@material-ui/icons/People'
import TimelineIcon from '@material-ui/icons/Timeline'

function NavBottom(props) {
  const route = props.history.location.pathname.slice(1)
  return (
    <div className="Nav">
      <BottomNavigation
        value={route}
        showLabels
      >
        <BottomNavigationAction
          value="friends"
          label="Friends"
          icon={<FriendsIcon />}
          component={Link}
          to="/friends"
          disableRipple
        />
        <BottomNavigationAction
          value="transactions"
          label="Transactions"
          icon={<ListIcon />}
          component={Link}
          to="/transactions"
          disableRipple
        />
        <BottomNavigationAction
          value="timeline"
          label="Timeline"
          icon={<TimelineIcon />}
          component={Link}
          to="/timeline"
          disableRipple
        />
      </BottomNavigation>
    </div>
  );
}

export default withRouter(NavBottom);
