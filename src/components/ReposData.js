import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import {
  LanguagesUsed,
  MostPopularStars,
  MostForked,
  StarsPerLang,
} from './Charts';

const Repos = () => {
  const { repoState } = React.useContext(GithubContext);

  // # collect amount of language used and stars in it-------------------------
  const langAndStarCorrected = repoState.reduce((obj, item) => {
    const { language, stargazers_count: starCountLang } = item;
    let insObj = obj;

    if (!language) return insObj; // not have language return {} undefined
    // and destruction name if not have add value 1 else add value it
    // countLanguage and stars of lang
    if (!insObj[language]) {
      insObj[language] = { label: language, value: 1, stars: starCountLang };
    } else {
      insObj[language] = {
        ...insObj[language],
        value: insObj[language].value + 1,
        stars: insObj[language].stars + starCountLang,
      };
    }
    return insObj;
  }, {});

  // Object.values destructure obj into array [obj,obj]
  const objInArr = Object.values(langAndStarCorrected);

  // # collect most used language-------------------------------------
  const allTotalLang = objInArr.reduce((acc, item) => {
    let accum = acc;
    accum += item.value;
    return accum;
  }, 0);

  const objCalPercent = objInArr.reduce((acc, item) => {
    const percentage = (item.value / allTotalLang) * 100;
    // build obj {name:{}}
    acc[item.label] = { label: item.label, value: percentage };
    return acc;
  }, {});

  const mostUsedSorted = Object.values(objCalPercent)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5); // First 5 language

  // # most stars per language---------------------------------
  const mostStarsPerLang = objInArr.reduce((acc, item) => {
    acc[item.label] = { label: item.label, value: item.stars };
    return acc;
  }, {});

  const mostStarsPerLangSorted = Object.values(mostStarsPerLang)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5); // First 5 language

  // # 6 first repos stared mostPopular and Most forks------------
  let { stars, forks } = repoState.reduce(
    (acc, item) => {
      const { stargazers_count: starsCount, name, forks: forker } = item;
      acc.stars[starsCount] = { label: name, value: starsCount };
      acc.forks[forker] = { label: name, value: forker };
      return acc;
    },
    { stars: {}, forks: {} }
  );

  stars = Object.values(stars).slice(-6).reverse();
  forks = Object.values(forks).slice(-6).reverse();

  return (
    <section className="section">
      <Wrapper className="section-center">
        <LanguagesUsed data={mostUsedSorted} />
        <MostPopularStars data={stars} />
        <StarsPerLang data={mostStarsPerLangSorted} />
        <MostForked data={forks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
