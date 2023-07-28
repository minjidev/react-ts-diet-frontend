import { styled, css } from 'styled-components';

export const AuthContainer = styled.div`
  width: 80%;
  max-width: 36rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 4rem;
`;

export const Flex = styled.div`
  display: flex;
`;

export const Center = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ColorProps {
  color: string;
}

export const Color = styled.span<ColorProps>`
  color: ${({ color }) => color};
`;

export const Divider = styled.hr`
  height: 1px;
  width: 100%;
  box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 0.5);
  margin: 1rem;
`;
