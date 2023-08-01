import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ReadOnlyTrip from '../ReadOnlyTrip';
import AuthTrip from './AuthTrip';

const Trip = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams();

  if (searchParams.get('readonly')) {
    return <ReadOnlyTrip tripId={id as string} />;
  }

  return <AuthTrip tripId={id as string} />;
};

export default Trip;
