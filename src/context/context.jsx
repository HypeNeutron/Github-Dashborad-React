import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

function GithubProvider({ children }) {
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

  //* Check rate request
  const checkRequests = useCallback(() => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        const {
          rate: { remaining },
        } = data;
        setRequests(remaining);

        if (remaining === 0) {
          toggleError(true, 'sorry you have exceeded your hourly rate limit!');
        }
      })
      .catch((err) => toggleError(true, `${err}`));
  }, []);

  //* Search User
  const searchGithubUser = useCallback(
    async (user) => {
      toggleError();
      setIsLoading(true);

      const res = await axios(`${rootUrl}/users/${user}`).catch((err) => {
        toggleError(true, `${err}`);
        setIsLoading(false);
      });

      if (res) {
        setGithubUser(res.data);
        const { login, followers_url: followerURL } = res.data;
        const repos100 = axios(`${rootUrl}/users/${login}/repos?per_page=100`);
        const follower100 = axios(`${followerURL}?per_page=100`);

        await Promise.allSettled([repos100, follower100])
          .then((results) => {
            const [repos, followers] = results;
            const status = 'fulfilled';

            if (repos.status === status && repos.value.data) {
              setRepoState(repos.value.data);
            } else {
              setRepoState([]);
            }

            if (followers.status === status && followers.value.data) {
              setFollowerState(followers.value.data);
            } else {
              setFollowerState([]);
            }
          })
          .catch((err) => toggleError(true, `${err}`));
      } else {
        toggleError(true, 'there is no user with that username');
        setIsLoading(false);
      }
      checkRequests();
      setIsLoading(false);
    },
    [checkRequests]
  );

  useEffect(checkRequests, [checkRequests]);

  // get initial user
  // useEffect(() => {
  //   searchGithubUser('HypeNeutron');
  // }, [searchGithubUser]);

  const valueMemo = React.useMemo(() => {
    return {
      githubUser,
      repoState,
      followerState,
      searchGithubUser,
      requests,
      error,
      isLoading,
    };
  }, [
    githubUser,
    repoState,
    followerState,
    searchGithubUser,
    requests,
    error,
    isLoading,
  ]);

  return (
    <GithubContext.Provider value={valueMemo}>
      {children}
    </GithubContext.Provider>
  );
}

export { GithubProvider, GithubContext };
