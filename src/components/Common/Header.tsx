import React, { Fragment } from 'react';
import { styled, css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms/userState';
import { signOut } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { Flex, Color } from '../../styles/styled/Common';
import { notify } from '../../utils/notify';

const menu = [
  { name: 'Home', path: '/main', isAuthorizationNeeded: false },
  { name: 'About', path: '/about', isAuthorizationNeeded: false },
  { name: 'Recipes', path: '/recipes', isAuthorizationNeeded: false },
  { name: 'Dashboard', path: '/dashboard', isAuthorizationNeeded: true },
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
        <FlexToLeft>
          {menu.map(({ name, path, isAuthorizationNeeded }) => (
            <TextLink
              key={name}
              to={isAuthorizationNeeded ? authorizedPath(path) : path}
              fontSize="1.3rem"
              paddingtop={2}>
              {name}
            </TextLink>
          ))}
        </FlexToLeft>
        <div>
          {user ? (
            <TextButton onClick={handleSignOut}>LogOut</TextButton>
          ) : (
            <>
              {' '}
              <TextLink to={'/signin'} paddingtop={1}>
                LogIn
              </TextLink>
              <TextLink to={'/signup'} paddingtop={1}>
                Register
              </TextLink>
            </>
          )}
        </div>
      </Content>
    </Container>
  );
};

const Title = styled(Color)`
  font-size: 2rem;
  font-weight: 500;
`;

const FlexToLeft = styled(Flex)`
  /* margin-left: 12rem; */
`;

const Container = styled.div`
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

  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 800;
`;

export default Header;
