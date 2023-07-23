import React from 'react';
import Carousel from '../components/common/Carousel';
/**
 * - recipe api에서 recipe 카테고리별로 받아오기(20개)
 * - 제목 + 카드 가로 캐러셀 컴포넌트 만들기
 * - 3개 정도 배치
 */

const Main = () => {
  return (
    <>
      <Carousel category="balanced" />
      <Carousel category="high-protein" />
      <Carousel category="low-fat" />
      <Carousel category="low-carb" />
    </>
  );
};

export default Main;
