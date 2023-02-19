import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useFetchTrips from './hooks/useFetchTrips';

const UpcomingTrips = () => {
  const {
    auth: { user },
  } = useAuth();
  const { data: trips } = useFetchTrips(user._id as string);

  console.log({ trips });

  return <div></div>;
};

export default UpcomingTrips;
