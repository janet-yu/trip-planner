import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  border-radius: 16px;
  background: ${(props) => props.theme.colors.grey['50']};
  display: flex;
  overflow: hidden;
`;

const CardDetails = styled.div`
  flex: 1;
  padding: 24px;
`;

const CardHeader = styled.div`
  padding-bottom: 12px;
  border-bottom: 2px solid ${(props) => props.theme.colors.grey['100']};
`;

const CardTitle = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 8px;
`;

const CardSubtitle = styled.p`
  color: ${(props) => props.theme.colors.grey['500']};
  font-size: 0.875rem;
`;

const CardDescription = styled.p`
  padding-top: 12px;
  font-size: 1rem;
`;

const CardImageWrapper = styled.div`
  flex: 1;
`;

type PlaceCardProps = {
  title: string;
  subtitle: string;
  description: string;
  img?: string;
};

const PlaceCard = (props: PlaceCardProps) => {
  const { title, subtitle, description, img } = props;

  return (
    <Card>
      <CardDetails>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>{subtitle}</CardSubtitle>
        </CardHeader>
        <CardDescription>{description}</CardDescription>
      </CardDetails>
      {img && (
        <CardImageWrapper>
          <img src={img} style={{ width: '100%', borderRadius: '16px' }} />
        </CardImageWrapper>
      )}
    </Card>
  );
};

export default PlaceCard;
