import React, { useState } from 'react';
import {
  LoginPageContainer,
  LoginContainer,
  LoginWelcomeBox,
  WelcomeTextWrapper,
  WelcomeText,
  WelcomeTextSpan,
  LoginFormBox,
} from './styles';
import { TripCodeForm } from './TripCodeForm';
import { LoginForm } from './LoginForm';
import SignupForm from './forms/SignUp';

/**
 * What we need:
 * 1. Login button
 * 2. Sign up button
 * 3. Text inputs for username / password
 * 4. Card for welcome
 * 5. Card for login components
 * 6. Endpoint for login
 * 7. Login State machine for which views to render
 */
const LoginPage = () => {
  const [loginView, setLoginView] = useState('login');

  const renderLoginView = () => {
    if (loginView === 'code') {
      return <TripCodeForm setLoginView={setLoginView} />;
    }

    if (loginView === 'login') {
      return <LoginForm setLoginView={setLoginView} />;
    }

    if (loginView === 'signup') {
      return <SignupForm setLoginView={setLoginView} />;
    }
  };

  return (
    <LoginPageContainer>
      <LoginContainer>
        <LoginWelcomeBox>
          <WelcomeTextWrapper>
            <WelcomeText>
              Take a <WelcomeTextSpan>TRIP!</WelcomeTextSpan>
            </WelcomeText>
          </WelcomeTextWrapper>
        </LoginWelcomeBox>
        <LoginFormBox>{renderLoginView()}</LoginFormBox>
      </LoginContainer>
    </LoginPageContainer>
  );
};

export default LoginPage;
