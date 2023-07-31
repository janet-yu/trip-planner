import React from 'react';
import PlanTripForm from './Forms/PlanTripForm';
import styled from 'styled-components';
import PageHeader from '../../components/PageHeader';

export const PageContainer = styled.div`
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

const PlanTripPage = (props: any) => {
  return (
    <PageContainer>
      <PageInnerContainer>
        <PageHeader title="Plan a Trip" />
        <PlanTripForm />
      </PageInnerContainer>
    </PageContainer>
  );
};

export default PlanTripPage;
