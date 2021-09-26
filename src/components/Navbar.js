import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const isUser = isAuthenticated && user;
  const validPicture = isUser && user.picture;
  const validProfileName = isUser && user.name;

  if (validPicture) {
    localStorage.setItem('picProfile', user.picture);
  }

  if (validProfileName) {
    localStorage.setItem('nameProfile', user.name);
  }

  const getPicture = () => {
    let pic = user.picture;
    if (localStorage.getItem('picProfile')) {
      pic = localStorage.getItem('picProfile');
    }
    return pic;
  };

  const getNameProfile = () => {
    let name = user.name;
    if (localStorage.getItem('nameProfile')) {
      name = localStorage.getItem('nameProfile');
    }
    return name;
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
          onClick={() => {
            logout({ returnTo: window.location.origin });
          }}
        >
          logout
        </button>
      ) : (
        <button onClick={loginWithRedirect}>login</button>
      )}
    </Nav>
  );
};

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

export default Navbar;
