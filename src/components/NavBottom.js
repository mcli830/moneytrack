import React from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountIcon from '@material-ui/icons/AccountCircle';
import ListIcon from '@material-ui/icons/List';
import FriendsIcon from '@material-ui/icons/People';
import TimelineIcon from '@material-ui/icons/Timeline';

export default props => {
  return (
    <div className="Nav">
      <BottomNavigation
        value={props.view}
        showLabels
        onChange={(evt, newVal) => {
          props.changeView(newVal);
        }}
      >
        <BottomNavigationAction
          value="account"
          label="Account"
          icon={<AccountIcon />}
          component={Link}
          to="/account"
        />
        <BottomNavigationAction
          value="transactions"
          label="Transactions"
          icon={<ListIcon />}
          component={Link}
          to="/transactions"
        />
        <BottomNavigationAction
          value="friends"
          label="Friends"
          icon={<FriendsIcon />}
          component={Link}
          to="/friends"
        />
        <BottomNavigationAction
          value="timeline"
          label="Timeline"
          icon={<TimelineIcon />}
          component={Link}
          to="/timeline"
        />
      </BottomNavigation>
    </div>
  );
}
