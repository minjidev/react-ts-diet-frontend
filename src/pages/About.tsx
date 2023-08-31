import React from 'react';
import { styled } from 'styled-components';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';
import { featuresDesc, desc, descKey } from '../constants/about';

const About = () => {
  return (
    <Container aria-label="about us">
      {descKey.map(key => (
        <Content key={key}>
          <Title>{capitalizeFirstLetter(key)}</Title>
          <Desc>
            {key === 'features'
              ? featuresDesc.map(({ title, content }) => (
                  <FeatureList>
                    <Feature>
                      <FeatureTitle>{title}</FeatureTitle>
                      <FeatureContent>{content}</FeatureContent>
                    </Feature>
                  </FeatureList>
                ))
              : desc[key]}
          </Desc>
        </Content>
      ))}
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  max-width: 1400px;
  font-weight: 300;
  font-size: 1.2rem;
  line-height: 30px;
  font-family: 'Rubik';
  margin-right: auto;
  padding: 0 80px;
`;

const Content = styled.article`
  padding: 1.2rem;
`;

const Title = styled.h2`
  font-weight: 500;
  font-size: 2rem;
  padding: 1rem 0;
`;

const Desc = styled.section``;

const FeatureList = styled.ol`
  list-style: disc;
  margin: 0;
`;

const Feature = styled.li`
  padding: 1rem 0;
`;

const FeatureTitle = styled.h3`
  font-weight: 400;
`;
const FeatureContent = styled.div``;

export default About;
