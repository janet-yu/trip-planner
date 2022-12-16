import styled from 'styled-components';

export const LoginPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-content: center;
  justify-content: center;
`;

export const LoginContainer = styled.div`
  align-self: center;
  display: flex;
`;

export const LoginWelcomeBox = styled.div`
  background-color: ${(props) => props.theme.colors.accent};
  padding: 1em;
  min-width: 400px;
  color: ${(props) => props.theme.colors.primary['500']};
  text-align: left;
`;

export const LoginFormBox = styled.div`
  min-width: 400px;
  border: 1px solid #ccc;
  padding: 3em;
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
`;
