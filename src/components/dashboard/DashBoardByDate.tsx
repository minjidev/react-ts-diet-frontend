import React, { useState } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useRecoilValue } from 'recoil';
import { DatePicker, RecipeCard, NutritionInfo } from '../index';
import { Divider } from '../../styles/styled/Common';
import { useObserver, useSavedRecipesByDate } from '../../hooks/index';
import { formatDate } from '../../utils/index';
import { userState } from '../../recoil/atoms/userState';

const DashBoardByDate = () => {
  const [selected, setSelected] = useState<Date | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const user = useRecoilValue(userState);

  const { data: savedRecipes } = useSavedRecipesByDate({
    date: selected ?? new Date(),
    userId: user?._id,
  });
  const observer = useObserver(savedRecipes);
  const handleDateClick = () => {
    setIsOpen(true);
  };

  return (
    <Container aria-label="user dashboard">
      <DateSelector>
        <Flex onClick={handleDateClick}>
          <ArrowIcon />
          <SelectedDate>{selected ? formatDate(selected) : formatDate(new Date())}</SelectedDate>
        </Flex>
        {isOpen && (
          <DatePicker
            selected={selected}
            setSelected={setSelected}
            selectedDefault
            direction="bottom"
            setIsOpen={setIsOpen}
            isInputDisplayed={false}
          />
        )}
      </DateSelector>
      <Divider />
      {!savedRecipes?.recipesByDate.length ? (
        <Box />
      ) : (
        <Content>
          {!savedRecipes ||
          Object.keys(savedRecipes).length === 0 ||
          savedRecipes?.recipesByDate.length === 0 ? (
            <Text>Nothing saved yet !</Text>
          ) : (
            <>
              <SavedMealsSection aria-labelledby="saved meals">
                <SubTitle id="saved meals">Your Meals</SubTitle>
                <Flex $align="space-around">
                  {savedRecipes?.recipesByDate.map(savedRecipe => (
                    <RecipeCard
                      key={savedRecipe.recipe.recipeId}
                      recipe={savedRecipe.recipe}
                      selected={selected}
                      observer={observer}
                    />
                  ))}
                  {Array.from({ length: 4 }, (_, idx) => idx).map(val => (
                    <Filler key={val} id="filler" />
                  ))}
                </Flex>
              </SavedMealsSection>
              <Divider />
              <NutritionInfo savedRecipes={savedRecipes} />
            </>
          )}
        </Content>
      )}
    </Container>
  );
};

const Filler = styled.div`
  width: 15rem;
  height: 0;
`;

const Container = styled.section`
  height: 100%;
  width: 100%;
  font-family: 'Rubik';
  font-size: 1.4rem;
  font-weight: 200;
  padding: 2rem 0;
`;

const Box = styled.div`
  height: calc(100vh - 80px);
`;

const DateSelector = styled.div`
  position: relative;
`;

const Flex = styled.div<{ $align?: string }>`
  display: flex;

  margin-bottom: 2rem;
  flex-wrap: wrap;

  justify-content: ${({ $align }) => $align || 'flex-start'};
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

const SubTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 400;
  padding: 1rem;
`;

const Text = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  padding: 1rem 0;
`;

const SavedMealsSection = styled.section``;

export default DashBoardByDate;
