import React from 'react';
import styled from 'styled-components';
import Navigation from '../Navigation';

const Header = styled.header`
  text-align: center;
  padding: 5rem 2rem 2rem;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin: 4rem 0;
`;

type PageHeaderProps = {
  title: string;
};

const PageHeader = (props: PageHeaderProps) => {
  return (
    <Header>
      <Navigation />
      <Title>{props.title}</Title>
    </Header>
  );
};

export default PageHeader;
