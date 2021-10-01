import React from 'react';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import UserFollowers from './UserFollowers';

function CardUser() {
  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <UserInfo></UserInfo>
        <UserFollowers></UserFollowers>
      </Wrapper>
    </section>
  );
}

const Wrapper = styled.div`
  padding-top: 2rem;
  display: grid;
  gap: 3rem 2rem;
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
  /* align-items: start; */
`;

export default CardUser;
