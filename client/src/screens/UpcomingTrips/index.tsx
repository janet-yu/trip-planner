import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useFetchTrips from './hooks/useFetchTrips';
import PageHeader from '../../components/PageHeader';
import { PageContainer } from '../PlanTrip';
import Card from '../../components/Card';
import CardTitle from '../../components/Card/CardTitle';
import CardSubtitle from '../../components/Card/CardSubtitle';
import CardTextArea from '../../components/Card/CardTextArea';

const UpcomingTrips = () => {
  const {
    auth: { user },
  } = useAuth();
  const { data: trips } = useFetchTrips(user._id as string);

  console.log({ trips });
  const renderTrips = () => {
    return trips?.map((trip) => {
      return (
        <Card
          backgroundImageUrl={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photo_reference=${
            trip.details.photos &&
            (trip.details.photos[0] as any).photo_reference
          }&key=AIzaSyCpTac3TkWVqlwesacX7YFbZfqOuXLVU8g`}
          link={`/trip/${trip.id}`}
        >
          <CardTextArea>
            <CardTitle size='large'>{trip.details.title}</CardTitle>
            <CardSubtitle>{trip.details.startDate}</CardSubtitle>
          </CardTextArea>
        </Card>
      );
    });
  };

  return (
    <PageContainer>
      <PageHeader title='Upcoming Trips' />
      {renderTrips()}
    </PageContainer>
  );
};

export default UpcomingTrips;
