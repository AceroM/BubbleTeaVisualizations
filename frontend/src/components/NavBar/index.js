import React from "react";
import Stateastics from "../../static/stateastics.png";

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MapTwoToneIcon from '@material-ui/icons/MapTwoTone';
import FilterDramaTwoToneIcon from '@material-ui/icons/FilterDramaTwoTone';
import BubbleChartTwoToneIcon from '@material-ui/icons/BubbleChartTwoTone';
import "./NavBar.scss";

function NavBar() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="grid-container">
        <a href="/">
          <img className="logo" src={Stateastics} alt="logo" />
        </a>
      </div>
      <div className="nav-bar">
        <BottomNavigation value={value} onChange={handleChange}>
          <BottomNavigationAction label="Map" value="map" icon={<MapTwoToneIcon />} href="/" />
          <BottomNavigationAction label="Word Cloud" value="cloud" icon={<FilterDramaTwoToneIcon />} href="/wordcloud"/>
          <BottomNavigationAction label="Tableau Maps" value="report" icon={<BubbleChartTwoToneIcon />} href="/report"/>
        </BottomNavigation>
      </div>
    </div>
  );
}

export default NavBar;