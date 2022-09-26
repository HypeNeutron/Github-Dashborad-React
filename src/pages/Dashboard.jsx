import React from 'react';
import {
  Navbar,
  Searchbar,
  CardSummarizeInfo,
  CardUser,
  CardCharts,
} from '../components';

import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context';

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
      <CardSummarizeInfo />
      <CardUser />
      <CardCharts />
    </main>
  );
}

export default Dashboard;
