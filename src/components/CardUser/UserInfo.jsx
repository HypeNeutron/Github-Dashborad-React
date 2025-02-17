import React from 'react';
import styled from 'styled-components';
import { FaTwitter } from 'react-icons/fa';
import { MdBusiness, MdLocationOn, MdLink } from 'react-icons/md';
import { GithubContext } from '../../context';

function UserInfo() {
  const { githubUser } = React.useContext(GithubContext);

  const {
    avatar_url: avatarURL,
    html_url: htmlURL,
    name,
    company,
    blog,
    bio,
    location,
    twitter_username: twitUser,
  } = githubUser;

  return (
    <Article>
      <header>
        <img src={avatarURL} alt={name || 'avatar'} />
        <div>
          <h4>{name}</h4>
          {twitUser && <p>@{twitUser}</p>}
        </div>
        <a href={htmlURL} target="_blank" rel="noopener noreferrer">
          follow
        </a>
      </header>
      <p className="bio">{bio}</p>
      <div className="links">
        {company && (
          <p>
            <MdBusiness /> {company || 'N/A'}
          </p>
        )}
        {location && (
          <p>
            <MdLocationOn /> {location || 'N/A'}
          </p>
        )}
        {blog && (
          <a href={`https://${blog}`} target="_blank" rel="noopener noreferrer">
            <MdLink />
            {blog}
          </a>
        )}
        {twitUser && (
          <a
            href={`https://twitter.com/${twitUser}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />@{twitUser}
          </a>
        )}
      </div>
    </Article>
  );
}

const Article = styled.article`
  background: var(--clr-white);
  padding: 1.5rem 2rem;
  border-top-right-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  position: relative;
  &::before {
    content: 'user';
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    background: var(--clr-white);
    color: var(--clr-grey-5);
    border-top-right-radius: var(--radius);
    border-top-left-radius: var(--radius);
    text-transform: capitalize;
    padding: 0.5rem 1rem 0 1rem;
    letter-spacing: var(--spacing);
    font-size: 1rem;
  }
  header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    column-gap: 1rem;
    margin-bottom: 1rem;
    img {
      width: 75px;
      height: 75px;
      border-radius: 50%;
    }
    h4 {
      margin-bottom: 0.25rem;
    }
    p {
      margin-bottom: 0;
    }
    a {
      color: var(--clr-primary-5);
      border: 1px solid var(--clr-primary-5);
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      transition: var(--transition);
      cursor: pointer;
      &:hover {
        background: var(--clr-primary-5);
        color: var(--clr-white);
      }
    }
  }
  .bio {
    color: var(--clr-grey-3);
  }
  .links {
    p,
    a {
      margin-bottom: 0.25rem;
      display: flex;
      align-items: center;
      svg {
        margin-right: 0.5rem;
        font-size: 1.3rem;
      }
    }
    a {
      color: var(--clr-primary-5);
      transition: var(--transition);
      svg {
        color: var(--clr-grey-5);
      }
      &:hover {
        color: var(--clr-primary-3);
      }
    }
  }
`;
export default UserInfo;
