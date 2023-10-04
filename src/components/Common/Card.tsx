import React from 'react';
import styled from 'styled-components';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { mobileQuery } from '../../utils/index';

interface CardProps {
  $imgSrc: string;
  $imgDesc: string;
  title: string;
  desc: string;
}

const Card = ({ $imgSrc, $imgDesc, title, desc }: CardProps) => {
  return (
    <Container>
      <CardIcon $imgSrc={$imgSrc} $imgDesc={$imgDesc} />
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
      <ArrowIcon />
    </Container>
  );
};

interface CardIconProps {
  $imgSrc: string;
  $imgDesc: string;
}

const CardIcon = styled.img.attrs<CardIconProps>(({ $imgSrc, $imgDesc }) => ({
  src: $imgSrc,
  alt: $imgDesc,
}))`
  width: 11rem;
  position: absolute;
  /* transform: translate3D(-50%, -50%, 0); */

  left: 20%;
  top: -30%;

  ${mobileQuery} {
    width: 10rem;
    left: 25%;
    top: -30%;
  }
`;

const Container = styled.article`
  width: 20rem;
  min-height: 18rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-image: linear-gradient(to bottom right, #fdfbfb, #ebedee);
  position: relative;
  padding: 4rem 2rem 1.4rem 2rem;
  border-radius: 1.2rem;
  cursor: pointer;

  &:hover > ${CardIcon} {
    transition: transform 0.2s ease-in-out;
    transform: scale(1.1);
  }

  ${mobileQuery} {
    width: 100%;
    min-height: 15rem;
    padding: 4rem 2rem 0rem 2rem;
  }
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 500;
  margin: 1rem 0;

  ${mobileQuery} {
    font-size: 1.8rem;
    font-weight: 400;
    margin: 0.8rem 0;
  }
`;

const Desc = styled.div`
  font-size: 1.2rem;
  font-weight: 300;
  font-family: 'Rubik';
  margin: 1rem 0;

  ${mobileQuery} {
    font-size: 1.1rem;
    font-weight: 300;
  }
`;

const ArrowIcon = styled(BsFillArrowRightCircleFill)`
  width: 2rem;
  position: absolute;
  bottom: 0;
  transform: translate3d(-50%, 50%, 0);
  left: 50%;
  cursor: pointer;

  ${mobileQuery} {
    width: 1.6rem;
    bottom: 0.6rem;
    right: 0.6rem;
    transform: inherit;
    left: inherit;
  }
`;

export default Card;
