import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ListIcon from '@material-ui/icons/List';
import FriendsIcon from '@material-ui/icons/People';
import TimelineIcon from '@material-ui/icons/Timeline';

export default props => {
  return (
    <div className="Nav">
      <BottomNavigation
        value={props.view}
        showLabels
        onChange={(e, newValue) => {
          props.changeView(newValue);
        }}
      >
        <BottomNavigationAction value="friends" label="Friends" icon={<FriendsIcon />} />
        <BottomNavigationAction value="transactions" label="Transactions" icon={<ListIcon />} />
        <BottomNavigationAction value="timeline" label="Timeline" icon={<TimelineIcon />} />
      </BottomNavigation>
    </div>
  );
}
