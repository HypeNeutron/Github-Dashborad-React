import React from 'react';
import {
  Navbar,
  Searchbar,
  ReposDataInfoContainer,
  CardUser,
  ChartSectionDatas,
} from '../components';

import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';

function Dashboard() {
  const { isLoading } = React.useContext(GithubContext);
  if (isLoading) {
    return (
      <main>
        <Navbar />
        <Searchbar />
        <img src={loadingImage} alt="loading" className="loading-img" />
      </main>
    );
  }
  return (
    <main>
      <Navbar />
      <Searchbar />
      <ReposDataInfoContainer />
      <CardUser />
      <ChartSectionDatas />
    </main>
  );
}

export default Dashboard;
