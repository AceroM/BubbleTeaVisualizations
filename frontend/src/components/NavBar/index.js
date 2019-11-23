import React from 'react';
import Stateastics from '../../static/stateastics.png';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MapTwoToneIcon from '@material-ui/icons/MapTwoTone';
import FilterDramaTwoToneIcon from '@material-ui/icons/FilterDramaTwoTone';
import BubbleChartTwoToneIcon from '@material-ui/icons/BubbleChartTwoTone';
import { useMediaQuery } from 'react-responsive';
import './NavBar.scss';

const NavComponent = ({ value, handleChange }) => (
  <div className="nav-bar">
    <BottomNavigation value={value} onChange={handleChange}>
      <BottomNavigationAction
        className="tab"
        label="Map"
        value="map"
        icon={<MapTwoToneIcon />}
        href="/map?lat=40.76361&lng=-73.98653&place=new%20york%20city"
      />
      <BottomNavigationAction label="Word Cloud" value="cloud" icon={<FilterDramaTwoToneIcon />} href="/wordcloud" />
      <BottomNavigationAction label="Tableau Maps" value="report" icon={<BubbleChartTwoToneIcon />} href="/report" />
    </BottomNavigation>
  </div>
);

function NavBar() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const isMobile = useMediaQuery({ query: '(max-width: 649px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 650px)' });

  return (
    <div>
      <div className="grid-container">
        <a href="/">
          <img className="logo" src={Stateastics} alt="logo" />
        </a>
        {isDesktop && <NavComponent value={value} handleChange={handleChange} />}
      </div>
      {isMobile && <NavComponent value={value} handleChange={handleChange} />}
    </div>
  );
}

export default NavBar;
