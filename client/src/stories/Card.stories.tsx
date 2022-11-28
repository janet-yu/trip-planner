import React from 'react';
import Card from '../components/Card';

export default {
  title: 'Card',
  component: Card,
};

export const DefaultCard = () => (
  <Card
    cardTitle="Chicago"
    cardSubtitle="09/23/20"
    backgroundImageUrl="https://media.cntraveler.com/photos/61e865ea62e14c3f706eea5c/16:9/w_2580,c_limit/Chicago_GettyImages-1180689542.jpg"
    subtitlePosition="bottom"
    titleSize="large"
  />
);

export const ActivityCard = () => (
  <Card
    cardTitle="The Godfrey"
    cardSubtitle="123 address right here, 1292"
    subtitlePosition="bottom"
    textPosition="center"
    backgroundImageUrl="https://cf.bstatic.com/xdata/images/hotel/max500/36079229.jpg?k=8dd228cf37aff8dbfe235c4b9508fed7e45fd4193218f0ebf809a0a73f414f05&o=&hp=1"
    titleSize="small"
  />
);
