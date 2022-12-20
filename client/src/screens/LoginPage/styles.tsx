import styled from 'styled-components';
import { device } from '../../utils/mediaQueries';

export const LoginPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-content: center;
  justify-content: center;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  min-height: 450px;
  width: 75%;

  @media ${device.laptop} {
    flex-direction: row;
    width: auto;
  }
`;

export const LoginWelcomeBox = styled.div`
  background-color: ${(props) => props.theme.colors.accent};
  padding: 1em;
  color: ${(props) => props.theme.colors.primary['500']};
  text-align: left;

  @media ${device.laptop} {
    width: 400px;
  }
`;

export const LoginFormBox = styled.div`
  border: 1px solid #ccc;
  padding: 3em;
  text-align: center;

  @media ${device.laptop} {
    width: 400px;
  }
`;

export const WelcomeTextWrapper = styled.div`
  display: flex;
  align-items; center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const WelcomeText = styled.h1`
  font-size: 3em;
  margin: 0;
  max-width: 9ch;
  align-self: center;
`;

export const WelcomeTextSpan = styled.span`
  font-size: 2em;
  margin: 0;
`;

export const LoginPrompt = styled.h1`
  color: ${(props) => props.theme.colors.primary['500']};
`;

export const CTAText = styled.p`
  font-size: 0.8em;
  margin: 1rem 0;
`;
