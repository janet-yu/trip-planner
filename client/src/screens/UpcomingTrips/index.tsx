import React from 'react';
import useAuth from '../../hooks/useAuth';
import useFetchTrips from './hooks/useFetchTrips';
import PageHeader from '../../components/PageHeader';
import { PageContainer } from '../PlanTrip';
import Card from '../../components/Card';
import CardTitle from '../../components/Card/CardTitle';
import CardSubtitle from '../../components/Card/CardSubtitle';
import CardTextArea from '../../components/Card/CardTextArea';
import styled, { css } from 'styled-components';
import moment from 'moment';
import Box from '../../components/Box';

const TripsContainer = styled.div`
  max-width: 728px;
  width: 70%;
`;

const TimelineWrapper = styled.div<{ year?: string }>`
  padding: 15px;
  border-left: 3px solid ${(props) => props.theme.colors.grey[400]};
  position: relative;
`;

const YearMarker = styled.span<{ year: string }>`
  display: block;
  width: 14px;
  height: 3px;
  background: ${(props) => props.theme.colors.grey[400]};
  position: absolute;
  top: 4px;
  left: -14px;
  direction: rtl;

  &::before {
    color: ${(props) => props.theme.colors.grey[400]};
    content: '${(props) => props.year}';
    display: block;
    position: absolute;
    left: -48px;
    top: -4px;
    max-width: 40px;
  }
`;

const UpcomingTrips = () => {
  const {
    auth: { user }
  } = useAuth();
  const { data: trips } = useFetchTrips(user._id as string);
  const yearMap = new Map();

  const renderTrips = () => {
    return trips?.map((trip) => {
      const tripYear = moment(trip.date).year();
      let renderYear = false;

      if (!yearMap.has(tripYear)) {
        renderYear = true;
        yearMap.set(tripYear, true);
      }

      return (
        <TimelineWrapper key={trip._id}>
          {renderYear && <YearMarker year={String(tripYear)} />}
          <Box mBottom={12} key={trip._id}>
            <Card
              backgroundImageUrl={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photo_reference=${
                trip.photos && (trip.photos[0] as any).photo_reference
              }&key=AIzaSyCpTac3TkWVqlwesacX7YFbZfqOuXLVU8g`}
              link={`/trip/${trip._id}`}>
              <CardTextArea>
                <CardSubtitle>
                  {`${moment(trip.startDate).format('MMM DD YYYY')} - ${moment(trip.endDate).format(
                    'MMM DD YYYY'
                  )}`}
                </CardSubtitle>
                <CardTitle size="large">{trip.title}</CardTitle>
              </CardTextArea>
            </Card>
          </Box>
        </TimelineWrapper>
      );
    });
  };

  return (
    <PageContainer>
      <PageHeader title="Upcoming Trips" />
      <TripsContainer>{renderTrips()}</TripsContainer>
    </PageContainer>
  );
};

export default UpcomingTrips;
