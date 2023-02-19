import React from 'react';
import styled from 'styled-components';
import PageHeader from '../../components/PageHeader';

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  flex-direction: column;
`;

const PageInnerContainer = styled.div`
  max-width: 728px;
  width: 100%;
`;

const Home = () => {
  return (
    <PageContainer>
      <PageInnerContainer>
        <PageHeader title="Home" />
      </PageInnerContainer>
    </PageContainer>
  );
};

export default Home;
