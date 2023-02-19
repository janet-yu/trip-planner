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
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const LoginPage = () => {
  const [loginView, setLoginView] = useState('login');
  const { auth } = useAuth();
  const navigate = useNavigate();

  if (auth.user) {
    navigate('/');
  }

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
