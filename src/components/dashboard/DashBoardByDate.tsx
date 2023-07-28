import React, { useState } from 'react';
import { styled } from 'styled-components';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { DatePicker } from '../../components/index';
import { Divider } from '../../styles/styled/Common';

const DashBoardByDate = () => {
  // 오늘 기준으로 api 요청 (선택한 날짜 있으면 그걸로 요청 )
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleDateClick = (e: React.MouseEvent) => {
    setIsOpen(true);
  };
  return (
    <Container>
      <Relative id="relative">
        <Flex onClick={handleDateClick}>
          <ArrowIcon />
          <SelectedDate>
            {selected?.toLocaleDateString('default', { day: 'numeric', month: 'short', year: 'numeric' })}
          </SelectedDate>
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
`;

const SavedRecipes = styled.div``;

export default DashBoardByDate;
