import React from 'react';
import styled from 'styled-components';
import { GoRepo, GoGist } from 'react-icons/go';
import { FiUsers, FiUserPlus } from 'react-icons/fi';
import { GithubContext } from '../context';

export default function ReposIconInfo() {
  const { githubUser } = React.useContext(GithubContext);
  const {
    public_repos: pbRepo,
    followers,
    following,
    public_gists: pbGist,
  } = githubUser;

  const dataSummarize = [
    {
      id: 1,
      icon: <GoRepo className="icon" />,
      label: 'repos',
      value: pbRepo,
      color: 'pink',
    },
    {
      id: 2,
      icon: <FiUsers className="icon" />,
      label: 'followers',
      value: followers,
      color: 'green',
    },
    {
      id: 3,
      icon: <FiUserPlus className="icon" />,
      label: 'following',
      value: following,
      color: 'purple',
    },
    {
      id: 4,
      icon: <GoGist className="icon" />,
      label: 'gists',
      value: pbGist,
      color: 'yellow',
    },
  ];

  return (
    <section className="section">
      <Wrapper className="section-center">
        {dataSummarize.map((item) => {
          const { icon, label, value, color } = item;
          return (
            <figure className="item">
              <span className={color}>{icon}</span>
              <div>
                <h3>{value}</h3>
                <p>{label}</p>
              </div>
            </figure>
          );
        })}
      </Wrapper>
    </section>
  );
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }

  .item {
    border-radius: var(--radius);
    padding: 1rem 2rem;
    background: var(--clr-white);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 3rem;
    align-items: center;

    span {
      width: 3rem;
      height: 3rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
    }

    .icon {
      font-size: 1.5rem;
    }

    h3 {
      margin-bottom: 0;
      letter-spacing: 0;
    }
    p {
      margin-bottom: 0;
      text-transform: capitalize;
    }
    .pink {
      background: #ffe0f0;
      color: #da4a91;
    }
    .green {
      background: var(--clr-primary-10);
      color: var(--clr-primary-5);
    }
    .purple {
      background: #e6e6ff;
      color: #5d55fa;
    }
    .yellow {
      background: #fffbea;
      color: #f0b429;
    }
  }
`;
