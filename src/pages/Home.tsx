import React from 'react';
import { styled } from 'styled-components';
import { Button, Card } from '../components';
import { Link } from 'react-router-dom';
import { userState } from '../recoil/atoms/userState';
import { useRecoilValue } from 'recoil';

const cardsInfo = [
  {
    $imgSrc: '/react-ts-diet-icons/burger.png',
    $imgDesc: 'burger icon',
    title: 'Plan your dietary habits',
    desc: 'Jot down daily meal adventures effortlessly',
    path: '/main',
    isAuthoriationNeeded: false,
  },
  {
    $imgSrc: '/react-ts-diet-icons/calendar_2.png',
    $imgDesc: 'calendar icon',
    title: 'Keep track of your meals',
    desc: 'Record and Organize your meals to achieve your wellness goals.',
    path: '/main',
    isAuthoriationNeeded: false,
  },
  {
    $imgSrc: '/react-ts-diet-icons/recipe_1.png',
    $imgDesc: 'recipe icon',
    title: 'Discover Culinary Inspiration',
    desc: 'Browse a Diverse Collection of Tasty Recipes',
    path: '/recipes',
    isAuthoriationNeeded: false,
  },
  {
    $imgSrc: '/react-ts-diet-icons/dashboard_1.png',
    $imgDesc: 'dashboard icon',
    title: 'Assess the nutritional content',
    desc: 'Gain insights into essential macronutrients, vitamins, and minerals',
    path: '/dashboard',
    isAuthoriationNeeded: true,
  },
];

const Home = () => {
  const user = useRecoilValue(userState);
  const authroizedPath = (path: string) => (user ? path : '/signin');

  return (
    <Container>
      <SpecSection aria-labelledby="specs">
        <Title id="specs">
          <Underline color="var(--button-point-color)">NutriNotes,</Underline>Effortless Meal Tracker
        </Title>
        <Description>: All-in-one solution for effortless meal tracker and nutritional tracking</Description>
        <Link to={authroizedPath('/main')}>
          <MainButton>Get Started!</MainButton>
        </Link>
      </SpecSection>
      <MenuSection aria-labelledby="menus">
        <Title id="menus" className="sr-only">
          Website Menus
        </Title>
        <MenuList>
          {cardsInfo.map(({ $imgSrc, $imgDesc, title, desc, path, isAuthoriationNeeded }) => (
            <Menu>
              <Link key={title} to={isAuthoriationNeeded ? authroizedPath(path) : path}>
                <Card $imgSrc={$imgSrc} $imgDesc={$imgDesc} title={title} desc={desc} />
              </Link>
            </Menu>
          ))}
        </MenuList>
      </MenuSection>
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

const SpecSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 24rem;
  margin: 2rem 4rem;

  font-weight: 400;
  font-size: 4rem;
`;

const Title = styled.h2`
  font-size: inherit;
  font-weight: inherit;
`;

const Description = styled.div`
  padding-top: 2rem;
  font-weight: 300;
  font-size: 1.4rem;
  font-family: 'Rubik';
`;

const MenuSection = styled.section``;

const MainButton = styled(Button)`
  && {
    width: 10rem;
    background: var(--button-point-color);
    height: 3rem;
    color: #fff;
    font-weight: 500;
  }
`;

const MenuList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 6rem 3rem;

  margin: 2rem 4rem;
  width: 44rem;
  height: 40rem;
`;

const Menu = styled.li``;

export default Home;
