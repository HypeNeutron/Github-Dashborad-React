import React from 'react';
import {
  ReposIconInfo,
  ChartReposData,
  CardUser,
  Searchbar,
  Navbar,
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
        <img src={loadingImage} alt='loading' className='loading-img' />
      </main>
    );
  }
  return (
    <main>
      <Navbar />
      <Searchbar />
      <ReposIconInfo />
      <CardUser />
      <ChartReposData />
    </main>
  );
}

export default Dashboard;
