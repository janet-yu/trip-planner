import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { SpacingProps } from '../utils';
import { generateSpacingProps } from '../utils';

const Card = styled.div<Partial<PlaceCardProps>>`
  border-radius: 16px;
  background: ${(props) => props.theme.colors.grey['50']};
  display: flex;
  overflow: hidden;
  ${(props) => generateSpacingProps(props)}
`;

const CardDetails = styled.div`
  flex: 1;
  padding: 24px;
`;

const CardHeader = styled.div`
  padding-bottom: 12px;
  border-bottom: 2px solid ${(props) => props.theme.colors.grey['100']};
  display: flex;
  justify-content: space-between;
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
  line-height: 1.5;
`;

const CardImageWrapper = styled.div`
  flex: 1;
`;

const CardHeaderText = styled.div``;

const CardRemoveButton = styled.button`
  transition: all 0.3s ease-in-out;
  width: 32px;
  height: 32px;
  border-radius: 100%;

  &:hover {
    background: ${(props) => props.theme.colors.grey['100']};
    cursor: pointer;
  }
`;

type PlaceCardProps = {
  title: string;
  subtitle: string;
  description: string;
  img?: string;
  onRemove?: MouseEventHandler;
} & SpacingProps;

const PlaceCard = (
  props: PlaceCardProps & React.HTMLAttributes<HTMLDivElement>
) => {
  const { title, subtitle, description, img, onRemove, ...rest } = props;

  return (
    <Card {...rest}>
      <CardDetails>
        <CardHeader>
          <CardHeaderText>
            <CardTitle>{title}</CardTitle>
            <CardSubtitle>{subtitle}</CardSubtitle>
          </CardHeaderText>
          <CardRemoveButton onClick={onRemove}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </CardRemoveButton>
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
