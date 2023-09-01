import React from 'react';
import { styled } from 'styled-components';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';
import { featuresDesc, desc, descKey } from '../constants/about';
import { Divider } from '../styles/styled/Common';

const contactInfo = [
  { title: 'Email', href: 'mailto:alswl99710@gmail.com' },
  { title: 'Github', href: 'https://github.com/minjidev' },
  { title: 'Blog', href: 'https://bichoninthefront.tistory.com' },
];

const About = () => {
  return (
    <Container aria-label="about us">
      <Slogan>{`
      Nourishing Lives,
      One Byte at a Time
       : NutriNotes.`}</Slogan>
      <ContactContainer>
        <ContactTitle>Contact</ContactTitle>
        <DividerL />
        {contactInfo.map(({ title, href }) => (
          <>
            <Contact>
              <ExternalLink href={href}>
                {title}
                <Plus>+</Plus>
              </ExternalLink>
            </Contact>
            <DividerL />
          </>
        ))}
      </ContactContainer>

      <Img src="/images/meal.jpg" alt="healthy eating" />
      {descKey.map(key => (
        <Content key={key} title={key}>
          <Title>{capitalizeFirstLetter(key)}</Title>
          <DividerL />
          <Desc>
            {key !== 'features' && <div dangerouslySetInnerHTML={{ __html: desc[key] }} />}
            {key === 'features' &&
              featuresDesc.map(({ title, content }) => (
                <FeatureList key={title}>
                  <Feature>
                    <FeatureTitle>{title}</FeatureTitle>
                    <FeatureContent dangerouslySetInnerHTML={{ __html: content }} />
                  </Feature>
                </FeatureList>
              ))}
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
  padding: 0 10px;
  position: relative;

  display: grid;
  grid-template-rows: 200px 200px 1fr 0.6fr;
  grid-template-columns: 0.6fr 1fr 1fr;
  grid-template-areas:
    '. image image'
    '. image image'
    'developer story features'
    'contact goal features';
  gap: 30px 30px;

  & .highlight {
    text-decoration: solid underline var(--button-point-color) 3px;
    text-decoration-skip-ink: none;
  }

  & .bold {
    font-weight: 500;
  }
`;

const Slogan = styled.div`
  font-size: 5rem;
  font-weight: 700;
  position: absolute;
  left: 20px;
  top: -70px;
  font-family: 'Rubik';
  line-height: 100px;
  white-space: pre-line;
`;

const Content = styled.article<{ title: string }>`
  grid-area: ${({ title }) => title};
`;

const Title = styled.h2`
  font-weight: 500;
  font-size: 2rem;
  padding: 0.5rem 0;
`;

const Desc = styled.section``;

const FeatureList = styled.ol`
  list-style: disc;
  margin: 0;
`;

const Feature = styled.li`
  padding: 0.8rem 0;
`;

const FeatureTitle = styled.h3`
  font-weight: 400;
`;
const FeatureContent = styled.div``;

const Img = styled.img`
  grid-area: image;
  width: 100%;
  height: 80%;
  object-fit: cover;
  margin-top: auto;
`;

const ContactContainer = styled.article`
  grid-area: contact;
`;

const DividerL = styled(Divider)`
  margin: 0.6rem 0;
  width: 90%;
`;

const ContactTitle = styled.h2`
  font-weight: 400;
  font-size: 1.4rem;
  padding-top: 1rem;
`;

const Contact = styled.div`
  width: 90%;
  padding: 0.2rem;
`;

const Plus = styled.div`
  margin-left: auto;
`;

const ExternalLink = styled.a`
  padding: 0 0.4rem;
  display: flex;
`;

export default About;
