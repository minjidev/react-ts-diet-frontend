import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { DatePicker, RecipeCard, NutritionInfo } from '../../components/index';
import { Divider } from '../../styles/styled/Common';
import useSavedRecipesByDate from '../../hooks/useSavedRecipesByDate';
import { formatDate } from '../../utils/formatDate';

const DashBoardByDate = () => {
  const [selected, setSelected] = useState<Date | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const { data: savedRecipes } = useSavedRecipesByDate(selected);
  const handleDateClick = (e: React.MouseEvent) => {
    setIsOpen(true);
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
            <Flex>
              {savedRecipes?.recipesByDate.map(savedRecipe => (
                <RecipeCard key={savedRecipe.recipeId} recipe={savedRecipe.recipe} onRemoveClick={() => {}} />
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

const Flex = styled.div`
  display: flex;
  cursor: pointer;
  margin-bottom: 2rem;
`;

const SelectedDate = styled.div`
  font-size: 1.8rem;
  font-weight: 400;
`;

const ArrowIcon = styled(MdKeyboardArrowDown)`
  width: 1.2rem;
  margin: 0 1rem;
`;

const Content = styled.div`
  padding: 0 1.4rem;
`;

const SubTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  padding: 1rem 0;
`;

const SavedRecipes = styled.div``;

export default DashBoardByDate;
