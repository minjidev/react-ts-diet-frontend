import React, { Fragment } from 'react';
import { styled } from 'styled-components';
import { desc, descKey } from '../constants/about';
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
      <Img src="/images/meal.jpg" alt="healthy eating" />
      <ContactContainer>
        <ContactTitle>Contact</ContactTitle>
        <DividerL />
        {contactInfo.map(({ title, href }) => (
          <Fragment key={title}>
            <Contact>
              <ExternalLink href={href}>
                {title}
                <Plus>+</Plus>
              </ExternalLink>
            </Contact>
            <DividerL />
          </Fragment>
        ))}
      </ContactContainer>

      {descKey.map(key => (
        <Content key={key} title={key}>
          <Desc dangerouslySetInnerHTML={{ __html: desc[key] }} />
        </Content>
      ))}
      <MadeByContainer>
        <Divider />
        <MadeBy>
          <Small>Designed and Developed by</Small>
          <Name>Minji Kim</Name>
        </MadeBy>
      </MadeByContainer>
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
  position: relative;

  display: grid;
  grid-template-rows: 200px 200px 1fr 0.6fr;
  grid-template-columns: 300px 600px 400px;
  grid-template-areas:
    '. image image'
    '. image image'
    'contact story developer'
    'contact goal madeby';
  gap: 30px 30px;

  & .highlight {
    text-decoration: solid underline var(--button-point-color) 3px;
    text-decoration-skip-ink: none;
  }

  & .bold {
    font-weight: 500;
  }

  & .first-letter {
    font-weight: 700;
    font-size: 3rem;
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
  margin-top: ${({ title }) => (title !== 'developer' ? 'auto' : '')};
  line-height: 36px;
`;

const Desc = styled.section``;

const Img = styled.img`
  grid-area: image;
  width: 100%;
  height: 80%;
  object-fit: cover;
  margin-top: auto;
`;

const ContactContainer = styled.article`
  grid-area: contact;
  margin-top: auto;
`;

const DividerL = styled(Divider)`
  margin: 0.5rem 0;
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

const MadeByContainer = styled.div`
  grid-area: madeby;
`;

const MadeBy = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const Small = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: var(--border);
`;

const Name = styled.div`
  font-weight: 500;
`;

export default About;
