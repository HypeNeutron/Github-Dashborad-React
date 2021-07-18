import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';

const rootUrl = 'https://api.github.com/';

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repoState, setRepoState] = useState(mockRepos);
  const [followerState, setFollowerState] = useState(mockFollowers);

  //* request loading
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: '' });

  //* Toggle error
  function toggleError(show = false, msg = '') {
    setError({ show, msg });
  }

  //* Search User
  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);
    const res = await axios(`${rootUrl}users/${user}`).catch((err) =>
      console.error(err)
    );
    if (res) {
      setGithubUser(res.data);
      const { login, followers_url: followerURL } = res.data;
      const repos100 = axios(`${rootUrl}users/${login}/repos?per_page=100`);
      const follower100 = axios(`${followerURL}?per_page=100`);

      await Promise.allSettled([repos100, follower100]).then((result) => {
        const [repos, follower] = result;
        const status = 'fulfilled';
        if (repos.status === status) return setRepoState(repos.value.data);
        if (follower.status === status)
          return setFollowerState(follower.value.data);
        throw new Error();
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
        const {
          rate: { remaining },
        } = data;
        setRequests(remaining);

        if (remaining === 0) {
          toggleError(true, 'sorry you have exceeded your hourly rate limit!');
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(checkRequests, []);
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repoState,
        followerState,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
