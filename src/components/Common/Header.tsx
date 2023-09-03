import React from 'react';
import { styled, css } from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms/userState';
import { signOut } from '../../api/auth';
import { Color } from '../../styles/styled/Common';
import { notify } from '../../utils/notify';
import { BsSearch } from 'react-icons/bs';

const menu = [
  { name: 'Home', path: '/main', isAuthorizationNeeded: false },
  { name: 'About', path: '/about', isAuthorizationNeeded: false },
  { name: 'Recipes', path: '/search', isAuthorizationNeeded: false },
  { name: 'Dashboard', path: '/dashboard', isAuthorizationNeeded: true },
];

const authMenu = [
  { name: 'LogIn', path: '/signin' },
  { name: 'Register', path: '/signup' },
];

const Header = () => {
  const [user, setUser] = useRecoilState(userState);
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
        <Link to={'/'}>
          <Title color="black">NutriNotes</Title>
        </Link>
        <Nav aria-label="menu navigation">
          <MenuList>
            {menu.map(({ name, path, isAuthorizationNeeded }) => (
              <Menu key={name}>
                <TextLink
                  to={isAuthorizationNeeded ? authorizedPath(path) : path}
                  fontSize="1.3rem"
                  $iscurrent={path === pathname}>
                  {name}
                </TextLink>
              </Menu>
            ))}
          </MenuList>
        </Nav>
        <Flex>
          <Nav aria-label="user auth navigation">
            {user ? (
              <TextButton onClick={handleSignOut}>LogOut</TextButton>
            ) : (
              <AuthList>
                {authMenu.map(({ name, path }) => (
                  <Auth key={name}>
                    <TextLink to={path}>{name}</TextLink>
                  </Auth>
                ))}
              </AuthList>
            )}
          </Nav>
          <SearchLink to={'/search'}>
            <SearchIcon aria-label="search recipes" />
          </SearchLink>
        </Flex>
      </Content>
    </Container>
  );
};

const Flex = styled.div`
  display: flex;
`;

const Title = styled(Color).attrs({
  as: 'h1',
})`
  font-size: 2.2rem;
  font-weight: 500;
`;

const Nav = styled.nav`
  display: flex;
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
`;

const Menu = styled.li``;

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
  cursor: pointer;
  width: 28px;
  height: 28px;
`;

export default Header;
