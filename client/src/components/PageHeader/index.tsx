import React from 'react';
import styled from 'styled-components';
import Navigation from '../Navigation';

const Header = styled.header`
  text-align: center;
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
