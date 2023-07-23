import React from 'react';
import { styled } from 'styled-components';
import { Button, Card } from '../components';
import { Link } from 'react-router-dom';

const cardsInfo = [
  {
    $imgSrc: '/react-ts-diet-icons/burger.png',
    $imgDesc: 'burger icon',
    title: 'Plan your dietary habits',
    desc: 'Jot down daily meal adventures effortlessly',
  },
  {
    $imgSrc: '/react-ts-diet-icons/calendar_2.png',
    $imgDesc: 'calendar icon',
    title: 'Keep track of your meals',
    desc: 'Record and Organize your meals to achieve your wellness goals.',
  },
  {
    $imgSrc: '/react-ts-diet-icons/recipe_1.png',
    $imgDesc: 'recipe icon',
    title: 'Discover Culinary Inspiration',
    desc: 'Browse a Diverse Collection of Tasty Recipes',
  },
  {
    $imgSrc: '/react-ts-diet-icons/dashboard_1.png',
    $imgDesc: 'dashboard icon',
    title: 'Assess the nutritional content',
    desc: 'Gain insights into essential macronutrients, vitamins, and minerals',
  },
];

const Home = () => {
  return (
    <Container>
      <TextContainer>
        <Title>
          <Underline color="var(--button-point-color)">NutriNotes,</Underline>Effortless Meal Tracker
          <Description>: All-in-one solution for effortless meal tracker and nutritional tracking</Description>
          <Link to={'/main'}>
            <MainButton>Get Started!</MainButton>
          </Link>
        </Title>
      </TextContainer>
      <CardContainer>
        {cardsInfo.map(({ $imgSrc, $imgDesc, title, desc }) => (
          <Card key={title} $imgSrc={$imgSrc} $imgDesc={$imgDesc} title={title} desc={desc} />
        ))}
      </CardContainer>
    </Container>
  );
};

const Underline = styled.div<{ color: string }>`
  text-decoration: ${({ color }) => `underline ${color}`};
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 24rem;
  margin: 2rem 4rem;
`;

const Title = styled.h2`
  font-weight: 400;
  font-size: 4rem;
`;

const Description = styled.div`
  padding-top: 2rem;
  font-weight: 300;
  font-size: 1.4rem;
  font-family: 'Rubik';
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 6rem 3rem;
  margin: 2rem 4rem;
  width: 44rem;
  height: 40rem;
`;

const MainButton = styled(Button)`
  && {
    width: 10rem;
    background: var(--button-point-color);
    height: 3rem;
    color: #fff;
    font-weight: 500;
  }
`;

export default Home;
