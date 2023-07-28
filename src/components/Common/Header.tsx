import React, { useRef } from 'react';
import { styled, css } from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms/userState';
import { signOut } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { Flex, Color } from '../../styles/styled/Common';

const menu = [
  { name: 'Home', path: '/main' },
  { name: 'About', path: '/about' },
  { name: 'Recipes', path: '/recipes' },
  { name: 'Dashboard', path: '/dashboard' },
];

const Header = () => {
  const inputRef = useRef(null);
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <HeaderTop>
        {user ? (
          <TextButton onClick={handleSignOut}>SignOut</TextButton>
        ) : (
          <>
            <TextLink to={'/signin'} paddingtop={1}>
              SignIn
            </TextLink>
            <TextLink to={'/signup'} paddingtop={1}>
              SignUp
            </TextLink>
          </>
        )}
      </HeaderTop>
      <Content>
        <Link to={'/'}>
          <Title color="var(--button-point-color)">NutriNotes</Title>
        </Link>
        <FlexToLeft>
          {menu.map(({ name, path }) => (
            <TextLink key={name} to={path} fontSize="1.3rem" paddingtop={2}>
              {name}
            </TextLink>
          ))}
        </FlexToLeft>
        <SearchBarContainer>
          <SearchBar ref={inputRef} title="search bar icon" />
          <SearchIcon />
        </SearchBarContainer>
      </Content>
    </Container>
  );
};

const Title = styled(Color)`
  font-size: 2rem;
  font-weight: 500;
`;

const FlexToLeft = styled(Flex)`
  margin-left: 12rem;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  min-height: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;

const HeaderTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0 1.4rem;
`;

const textStyle = css`
  font-size: 1rem;
  font-family: 'Londrina Solid';
  cursor: pointer;
`;

const TextButton = styled.button`
  ${textStyle}
  background: none;
  padding: 0.6rem 1rem;
`;

interface TextLinkProps {
  paddingtop: number;
  fontSize?: string;
}

const TextLink = styled(Link)<TextLinkProps>`
  ${textStyle}
  font-weight: 300;
  font-size: ${({ fontSize }) => fontSize};
  padding: ${({ paddingtop }) => `0.6rem ${paddingtop}rem`};
`;

const Content = styled.div`
  width: 100%;
  background: white;
  height: 3rem;
  border-radius: 2rem;
  /* padding: 0.2rem 1.4rem; */

  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 800;
`;

const SearchBarContainer = styled.div`
  width: 16rem;
  height: 100%;
  position: relative;
`;

const SearchBar = styled.input.attrs({
  type: 'TextLink',
  placeholder: 'Search your meal !',
})`
  padding: 0 3rem;
  border-radius: 1rem;
  font-size: 1rem;
  width: 100%;
  height: 100%;
  border: var(--border-secondary);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const SearchIcon = styled(BsSearch)`
  cursor: pointer; // not working
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  left: 6%;
`;

export default Header;
