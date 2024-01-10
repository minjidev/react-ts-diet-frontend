import React, { useState } from 'react';
import { styled, css } from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Styles } from 'styled-components/dist/types';
import { userState } from '../../recoil/atoms/userState';
import { signOut } from '../../api/auth';
import { Color } from '../../styles/styled/Common';
import { notify, mobileQuery } from '../../utils/index';

const menu = [
  { name: 'Recipes', path: '/main', isAuthorizationNeeded: false },
  { name: 'About', path: '/about', isAuthorizationNeeded: false },
  { name: 'Search', path: '/search', isAuthorizationNeeded: false },
  { name: 'Dashboard', path: '/dashboard', isAuthorizationNeeded: true },
];

const authMenu = [
  { name: 'LogIn', path: '/signin' },
  { name: 'Register', path: '/signup' },
];

const Header = () => {
  const [user, setUser] = useRecoilState(userState);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      localStorage.removeItem('user');
      navigate('/');

      notify({
        status: 'success',
        message: 'Successfully Signed Out !',
        icon: '✅',
      });
    } catch (error) {
      console.error(error);

      notify({
        status: 'error',
        message: 'Something Went Wrong!',
        icon: '🤪',
      });
    }
  };

  const authorizedPath = (path: string) => (user ? path : '/signin');

  return (
    <Container>
      <Content>
        <Flex css={{ width: '100%' }}>
          <Link to="/">
            <Title color="black">NutriNotes</Title>
          </Link>
          <MenuButton className="menu button" onClick={() => setIsOpen(true)} />
        </Flex>

        <NavContainer className="dimmed" $isopen={isOpen}>
          <FullWidth>
            <CloseButton onClick={() => setIsOpen(false)} />
            <Nav aria-label="menu navigation">
              <MenuList>
                {menu.map(({ name, path, isAuthorizationNeeded }) => (
                  <Menu key={name}>
                    <TextLink
                      to={isAuthorizationNeeded ? authorizedPath(path) : path}
                      fontSize="1.3rem"
                      $iscurrent={path === pathname}
                      onClick={() => setIsOpen(false)}>
                      {name}
                    </TextLink>
                  </Menu>
                ))}
              </MenuList>
            </Nav>
          </FullWidth>
          <Flex css={{ justifyContent: 'space-evenly', padding: '1rem', width: '100%' }}>
            <Nav aria-label="user auth navigation">
              {user ? (
                <TextButton onClick={handleSignOut}>LogOut</TextButton>
              ) : (
                <AuthList>
                  {authMenu.map(({ name, path }) => (
                    <Auth key={name}>
                      <TextLink to={path} onClick={() => setIsOpen(false)}>
                        {name}
                      </TextLink>
                    </Auth>
                  ))}
                </AuthList>
              )}
            </Nav>
            <SearchLink to="/search">
              <SearchIcon aria-label="search recipes" />
            </SearchLink>
          </Flex>
        </NavContainer>
      </Content>
    </Container>
  );
};
const CloseButton = styled(AiOutlineClose)`
  display: none;
  width: 24px;
  height: 24px;
  color: white;
  margin-left: auto;
  margin-bottom: 2rem;

  cursor: pointer;

  ${mobileQuery} {
    display: block;
  }
`;

const NavContainer = styled.div<{ $isopen: boolean }>`
  display: flex;
  width: 75%;
  justify-content: space-between;
  align-items: center;

  ${mobileQuery} {
    display: ${({ $isopen }) => ($isopen ? 'flex' : 'none')};
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(14, 25, 38, 0.9);
    padding: 2rem;
    z-index: 99;
    & * {
      color: white;
    }
  }
`;

const FullWidth = styled.div`
  ${mobileQuery} {
    width: 100%;
  }
`;

const Container = styled.header`
  position: absolute;
  top: 0;
  padding: 1.4rem 0;
  min-height: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  z-index: 9999;

  ${mobileQuery} {
    width: 80%;
  }
`;

const textStyle = css`
  font-size: 1rem;
  font-family: 'Londrina Solid';
  padding: 0.6rem 1rem;
  cursor: pointer;
`;

const TextButton = styled.button`
  ${textStyle}
  background: none;
`;

const MenuList = styled.ul`
  display: flex;

  ${mobileQuery} {
    flex-direction: column;
  }
`;

const Menu = styled.li`
  ${mobileQuery} {
    height: 4rem;
  }
`;

interface TextLinkProps {
  fontSize?: string;
  $iscurrent?: boolean;
}

const TextLink = styled(Link)<TextLinkProps>`
  ${textStyle}
  font-weight: ${({ $iscurrent }) => ($iscurrent ? '500' : '300')};
  font-size: ${({ fontSize }) => fontSize};
  padding: 0.6rem 2rem;
`;

const Content = styled.div`
  width: 100%;
  background: white;
  height: 3rem;
  border-radius: 2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 800;

  ${mobileQuery} {
    flex-direction: column;
  }
`;

const AuthList = styled.ul`
  display: flex;
`;

const Auth = styled.li``;

const SearchLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchIcon = styled(BsSearch)`
  display: block;
  cursor: pointer;
  width: 28px;
  height: 28px;

  ${mobileQuery} {
    display: block;
  }
`;

const MenuButton = styled(AiOutlineMenu)`
  display: none;

  ${mobileQuery} {
    display: block;
    width: 24px;
    height: 24px;
    margin-left: auto;
    cursor: pointer;
  }
`;

const Flex = styled.div<{ css?: Styles<object> }>`
  display: flex;

  ${mobileQuery} {
    ${({ css }) => css}
  }
`;

const Title = styled(Color).attrs({
  as: 'h1',
})`
  font-size: 2.2rem;
  font-weight: 500;

  ${mobileQuery} {
    font-size: 1.4rem;
    font-weight: 400;
  }
`;

const Nav = styled.nav`
  display: flex;
`;

export default Header;
