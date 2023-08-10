import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import { RecipeDetailModalProps } from '../../types/types';
import { AiOutlineClose } from 'react-icons/ai';
import { Dimmed } from '../../styles/styled/Common';

const colors = ['#E5CB63', '#F59E66', '#FD7468', '#F0AC9F'];

const RecipeDetailModal = ({ modalState: { isOpen, content }, onRecipeModalClick }: RecipeDetailModalProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!isOpen) return;
  if (!content) return;

  const handleCloseClick = () => {
    if (onRecipeModalClick) onRecipeModalClick({ isOpen: false });
  };

  const cuisineTypeTexts = content?.cuisineType.map((cuisine: string) =>
    cuisine.replace(/^\w/, (firstLetter: string) => firstLetter.toUpperCase())
  );

  return (
    <>
      <Container>
        <CloseButton onClick={handleCloseClick} />
        <Label>
          <RecipeEmoji role="image" aria-label="recipe book">
            📙
          </RecipeEmoji>
          <LabelText>{content?.label}</LabelText>
        </Label>
        <Flex>
          <Img src={content?.image} />
          <Description>
            <SubTitle>Nutrients</SubTitle>
            <Nutrients>
              {content?.totalNutrients.map((nutrient, index) => (
                <Nutrient key={nutrient?.label}>
                  <NutrientLabel>{nutrient?.label}</NutrientLabel>
                  <Quantity>
                    {nutrient?.quantity} {nutrient?.unit}
                  </Quantity>
                  <Ratio color={colors[index]}>{content?.totalDaily[index]?.quantity}%</Ratio>
                </Nutrient>
              ))}
            </Nutrients>
            <SubTitle>Detail</SubTitle>
            <DescText>
              {cuisineTypeTexts?.map((cuisine: string) => (
                <Tag key={cuisine} color="var(--border-secondary)">
                  # {cuisine}
                </Tag>
              ))}{' '}
              {content?.dishType || 'dish'}: Ideal for inidividuals with dietary preferneces such as{' '}
              {content?.healthLabels?.slice(0, 5).map((label: string) => (
                <Tag key={label} color="#fff">
                  # {label}
                </Tag>
              ))}
            </DescText>
          </Description>
        </Flex>
      </Container>
      <Dimmed onClick={handleCloseClick} />
    </>
  );
};

const Container = styled.section`
  min-width: 50rem;
  max-width: 50rem;
  height: 25rem;

  background: #fff;
  border: 1px solid #eee;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  border-radius: 1rem;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  padding: 1rem;
  z-index: 999;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.h2`
  font-size: 1.4rem;
  font-size: 24px;
  font-weight: 400;
`;

const LabelText = styled.span`
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: var(--button-dark-point-color);
    opacity: 0.4;
    z-index: -10;
  }
`;

const RecipeEmoji = styled.span`
  margin: 0 0.2rem;
`;

const CloseButton = styled(AiOutlineClose)`
  width: 1.3rem;
  display: block;

  cursor: pointer;
  position: absolute;
  right: 0.8rem;
  top: 0.8rem;
`;

const Img = styled.img`
  width: 50%;
  height: 20rem;
  margin: 1rem 0;

  border-radius: 1rem;
  object-fit: cover;
`;

const Description = styled.div`
  padding: 0.3rem 1rem 0.3rem 1rem;
  width: 100%;
`;

const Nutrients = styled.div`
  display: flex;
  justify-content: space-between;

  font-family: 'Rubik';
`;

const Nutrient = styled.div`
  width: calc(100% / 4);
  height: 7rem;
  border: 2px solid black;
  border-radius: 60px;
  margin: 0.3rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 0.5rem;
`;

const SubTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 400;

  margin: 0.56rem 0 0.3rem 0;
`;

const NutrientLabel = styled.div`
  font-size: 1rem;
  font-weight: 400;
`;

const Quantity = styled.div`
  font-size: 1rem;
  font-weight: 300;
`;

const Ratio = styled.div<{ color: string }>`
  width: 3rem;
  height: 3rem;

  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background: ${({ color }) => color};
`;

const Tag = styled.span<{ color: string }>`
  width: fit-content;
  padding: 0.3rem 0.6rem;
  height: 1.6rem;
  font-size: 1rem;
  font-weight: 400;
  background: var(--border-secondary);
  border-radius: 1rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0.2rem;
  margin-left: 0;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 2px -1px, rgba(0, 0, 0, 0.06) 0px 2px 2px -1px;
`;

const DescText = styled.div`
  font-family: 'Rubik';
  font-size: 1.2rem;
  font-weight: 200;
  line-height: 130%;
`;

export default RecipeDetailModal;
