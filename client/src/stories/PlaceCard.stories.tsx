import React from 'react';
import PlaceCardComponent from '../../src/components/PlaceCard';

export default {
  title: 'PlaceCard',
  component: PlaceCardComponent,
};

export const PlaceCard = () => (
  <PlaceCardComponent
    title="The Godfrey Hotel"
    subtitle="123 ABC Street, Chicago IL"
    description="The finest establishment at the heart of Chicago"
    img="https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/Cloud_Gate_%28The_Bean%29_from_east%27.jpg/340px-Cloud_Gate_%28The_Bean%29_from_east%27.jpg"
  />
);
