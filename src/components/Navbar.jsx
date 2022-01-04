import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

export default function Navbar() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const { picture, name } = user;
  const isUser = isAuthenticated && user;
  const validPicture = isUser && picture;
  const validProfileName = isUser && name;

  if (validPicture) {
    localStorage.setItem('picProfile', picture);
  }

  if (validProfileName) {
    localStorage.setItem('nameProfile', name);
  }

  const getPicture = () => {
    let pic = picture;
    if (localStorage.getItem('picProfile')) {
      pic = localStorage.getItem('picProfile');
    }
    return pic;
  };

  const getNameProfile = () => {
    let nameProfile = name;
    if (localStorage.getItem('nameProfile')) {
      nameProfile = localStorage.getItem('nameProfile');
    }
    return nameProfile;
  };

  return (
    <Nav>
      {isUser && user.picture && (
        <img src={getPicture()} alt={getNameProfile} />
      )}

      {isUser && user.name && (
        <h4>
          Welcome, <strong>{getNameProfile().toUpperCase()}</strong>
        </h4>
      )}

      {isUser ? (
        <button
          type="button"
          onClick={() => {
            logout({ returnTo: window.location.origin });
          }}
        >
          logout
        </button>
      ) : (
        <button type="submit" onClick={loginWithRedirect}>
          login
        </button>
      )}
    </Nav>
  );
}

const Nav = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
`;
