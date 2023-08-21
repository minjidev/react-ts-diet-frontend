import React, { Fragment } from 'react';
import { styled, css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms/userState';
import { signOut } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { Color } from '../../styles/styled/Common';
import { notify } from '../../utils/notify';

const menu = [
  { name: 'Home', path: '/main', isAuthorizationNeeded: false },
  { name: 'About', path: '/about', isAuthorizationNeeded: false },
  { name: 'Recipes', path: '/recipes', isAuthorizationNeeded: false },
  { name: 'Dashboard', path: '/dashboard', isAuthorizationNeeded: true },
];

const authMenu = [
  { name: 'Register', path: '/signup' },
  { name: 'Register', path: '/signup' },
];

const Header = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

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
          <Title color="var(--button-point-color)">NutriNotes</Title>
        </Link>
        <Nav aria-label="menu navigation">
          <MenuList>
            {menu.map(({ name, path, isAuthorizationNeeded }) => (
              <Menu>
                <TextLink key={name} to={isAuthorizationNeeded ? authorizedPath(path) : path} fontSize="1.3rem">
                  {name}
                </TextLink>
              </Menu>
            ))}
          </MenuList>
        </Nav>
        <Nav aria-label="user auth navigation">
          {user ? (
            <TextButton onClick={handleSignOut}>LogOut</TextButton>
          ) : (
            <AuthList>
              {authMenu.map(({ name, path }) => (
                <Auth>
                  <TextLink key={name} to={path}>
                    {name}
                  </TextLink>
                </Auth>
              ))}
            </AuthList>
          )}
        </Nav>
      </Content>
    </Container>
  );
};

const Title = styled(Color).attrs({
  as: 'h1',
})`
  font-size: 2rem;
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
  width: 80%;
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
}

const TextLink = styled(Link)<TextLinkProps>`
  ${textStyle}
  font-weight: 300;
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

export default Header;
