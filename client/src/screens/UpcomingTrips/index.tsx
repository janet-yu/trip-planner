import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useFetchTrips from './hooks/useFetchTrips';
import PageHeader from '../../components/PageHeader';
import { PageContainer } from '../PlanTrip';
import Card from '../../components/Card';
import CardTitle from '../../components/Card/CardTitle';
import CardSubtitle from '../../components/Card/CardSubtitle';
import CardTextArea from '../../components/Card/CardTextArea';
import styled from 'styled-components';
import moment from 'moment';
import Box from '../../components/Box';

const TripsContainer = styled.div`
  max-width: 728px;
  width: 70%;
`;

const UpcomingTrips = () => {
  const {
    auth: { user },
  } = useAuth();
  const { data: trips } = useFetchTrips(user._id as string);

  const renderTrips = () => {
    return trips?.map((trip) => {
      return (
        <Box mBottom={12}>
          <Card
            backgroundImageUrl={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photo_reference=${
              trip.photos && (trip.photos[0] as any).photo_reference
            }&key=AIzaSyCpTac3TkWVqlwesacX7YFbZfqOuXLVU8g`}
            link={`/trip/${trip._id}`}
          >
            <CardTextArea>
              <CardTitle size='large'>{trip.title}</CardTitle>
              <CardSubtitle>
                {`${moment(trip.startDate).format('MMM DD YYYY')} - ${moment(
                  trip.endDate
                ).format('MMM DD YYYY')}`}
              </CardSubtitle>
            </CardTextArea>
          </Card>
        </Box>
      );
    });
  };

  return (
    <PageContainer>
      <PageHeader title='Upcoming Trips' />
      <TripsContainer>{renderTrips()}</TripsContainer>
    </PageContainer>
  );
};

export default UpcomingTrips;
