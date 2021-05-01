import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com/';

const GithubContext = React.createContext();

// Provider,Consumer - GithubContext.Provider

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  //* request loading
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: '' });

  //* Search User
  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);
    const res = await axios(`${rootUrl}users/${user}`).catch((error) =>
      console.error(error)
    );
    if (res) {
      setGithubUser(res.data);
      const { login, followers_url } = res.data;
      const repos = axios(`${rootUrl}users/${login}/repos?per_page=100`);
      const follower = axios(`${followers_url}?per_page=100`);
      await Promise.allSettled([repos, follower]).then((resp) => {
        const [repos, follower] = resp;
        const status = 'fulfilled';
        repos.status === status && setRepos(repos.value.data);
        follower.status === status && setFollowers(follower.value.data);
      });

      setIsLoading(false);
    } else {
      toggleError(true, 'there is no user with that username');
      setIsLoading(false);
    }
  };

  //* check rate
  const checkRequests = () => {
    axios(`${rootUrl}rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);

        if (remaining === 0) {
          toggleError(true, 'sorry you have exceeded your hourly rate limit!');
        }
      })
      .catch((err) => console.error(err));
  };

  //* Toggle error
  function toggleError(show = false, msg = '') {
    setError({ show, msg });
  }

  useEffect(checkRequests, []);
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}>
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
