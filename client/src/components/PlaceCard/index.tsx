import { IconDefinition, faComment } from '@fortawesome/free-solid-svg-icons';
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
  max-height: 248px;
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

const CardDescriptionWrapper = styled.div`
  overflow: auto;
  height: 60%;
  margin-top: 16px;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
`;

const CardImageWrapper = styled.div`
  flex: 1;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardHeaderText = styled.div``;

const CardActionButton = styled.button`
  transition: all 0.3s ease-in-out;
  width: 32px;
  height: 32px;
  border-radius: 100%;

  &:hover {
    background: ${(props) => props.theme.colors.grey['100']};
    cursor: pointer;
  }
`;

const CardNotes = styled.div`
  background-color: #ddd;
  padding: 8px;
  border-radius: 4px;
  font-style: italic;
  margin-bottom: 12px;
`;

const CardActionButtonsContainer = styled.div``;

type PlaceCardProps = {
  title: string;
  subtitle: string;
  description: string;
  img?: string;
  onRemove?: MouseEventHandler;
  notes?: string;
  actionButtons: {
    icon: IconDefinition;
    onClick: any;
  }[];
} & SpacingProps;

const PlaceCard = (props: PlaceCardProps & React.HTMLAttributes<HTMLDivElement>) => {
  const { title, subtitle, description, img, onRemove, actionButtons, notes, ...rest } = props;

  return (
    <Card {...rest}>
      <CardDetails>
        <CardHeader>
          <CardHeaderText>
            <CardTitle>{title}</CardTitle>
            <CardSubtitle>{subtitle}</CardSubtitle>
          </CardHeaderText>
          <CardActionButtonsContainer>
            {actionButtons.map((action, idx) => {
              return (
                <CardActionButton onClick={action.onClick} key={idx}>
                  <FontAwesomeIcon icon={action.icon} />
                </CardActionButton>
              );
            })}
          </CardActionButtonsContainer>
        </CardHeader>
        <CardDescriptionWrapper>
          {notes && (
            <CardNotes>
              <FontAwesomeIcon icon={faComment} /> {notes}
            </CardNotes>
          )}
          <CardDescription>{description}</CardDescription>
        </CardDescriptionWrapper>
      </CardDetails>
      {img && (
        <CardImageWrapper>
          <CardImage src={img} />
        </CardImageWrapper>
      )}
    </Card>
  );
};

export default PlaceCard;
