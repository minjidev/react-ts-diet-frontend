import React, { useState } from 'react';
import { styled } from 'styled-components';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { DatePicker, RecipeCard, NutritionInfo } from '../../components/index';
import { Divider } from '../../styles/styled/Common';
import useSavedRecipesByDate from '../../hooks/useSavedRecipesByDate';
import { formatDate } from '../../utils/formatDate';
import { useQueryClient } from '@tanstack/react-query';
import { SavedRecipe } from '../../types/types';
import { savedRecipesByDateKey } from '../../constants';

const DashBoardByDate = () => {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<Date | undefined>();
  const [isOpen, setIsOpen] = useState(false);

  const { data: savedRecipes } = useSavedRecipesByDate(selected);

  const handleDateClick = (e: React.MouseEvent) => {
    setIsOpen(true);
  };

  const handleCancelButtonClick = () => {
    queryClient.invalidateQueries([...savedRecipesByDateKey, selected?.toLocaleDateString()]);
  };

  return (
    <Container>
      <Relative>
        <Flex onClick={handleDateClick}>
          <ArrowIcon />
          <SelectedDate>{selected ? formatDate(selected) : formatDate(new Date())}</SelectedDate>
        </Flex>
        {isOpen && (
          <DatePicker
            selected={selected}
            setSelected={setSelected}
            selectedDefault={true}
            direction="bottom"
            setIsOpen={setIsOpen}
            isInputDisplayed={false}
          />
        )}
      </Relative>
      <Divider />
      <Content>
        {!savedRecipes || Object.keys(savedRecipes).length === 0 || savedRecipes.recipesByDate?.length === 0 ? (
          <SubTitle>Nothing saved yet ! </SubTitle>
        ) : (
          <>
            <SubTitle>Your Meals</SubTitle>
            <Flex $align="space-around">
              {savedRecipes?.recipesByDate.map(savedRecipe => (
                <RecipeCard
                  key={savedRecipe.recipe.recipeId}
                  recipe={savedRecipe.recipe}
                  onCancelButtonClick={handleCancelButtonClick}
                />
              ))}
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <Filler key={index} id="filler" />
                ))}
            </Flex>
            <Divider />
            <NutritionInfo savedRecipes={savedRecipes} />
          </>
        )}
      </Content>
    </Container>
  );
};

const Filler = styled.div`
  width: 15rem;
  height: 0;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  font-family: 'Rubik';
  font-size: 1.4rem;
  font-weight: 200;
`;

const Relative = styled.div`
  position: relative;
`;

const Flex = styled.div<{ $align?: string }>`
  display: flex;

  margin-bottom: 2rem;
  flex-wrap: wrap;

  justify-content: ${({ $align }) => ($align ? $align : 'flex-start')};
  gap: 1rem 0;
  cursor: pointer;
`;

const SelectedDate = styled.div`
  font-size: 1.8rem;
  font-weight: 400;
`;

const ArrowIcon = styled(MdKeyboardArrowDown)`
  width: 1.2rem;
  margin: 0 1rem;
`;

const Content = styled.div``;

const SubTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  padding: 1rem 0;
`;

export default DashBoardByDate;
