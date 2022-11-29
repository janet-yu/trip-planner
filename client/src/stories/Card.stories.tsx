import React from 'react';
import Card from '../components/Card';
import CardTitle from '../components/Card/CardTitle';
import CardSubtitle from '../components/Card/CardSubtitle';
import CardTextArea from '../components/Card/CardTextArea';

export default {
  title: 'Card',
  component: Card,
  subcomponents: {
    CardTitle,
    CardSubtitle,
    CardTextArea,
  },
};

export const DefaultCard = () => (
  <Card
    backgroundImageUrl="https://media.cntraveler.com/photos/61e865ea62e14c3f706eea5c/16:9/w_2580,c_limit/Chicago_GettyImages-1180689542.jpg"
    textPosition="bottomLeft"
  >
    <CardTextArea>
      <CardTitle size="large">Chicago</CardTitle>
      <CardSubtitle>9/20/22</CardSubtitle>
    </CardTextArea>
  </Card>
);

export const ActivityCard = () => (
  <Card
    textPosition="center"
    backgroundImageUrl="https://cf.bstatic.com/xdata/images/hotel/max500/36079229.jpg?k=8dd228cf37aff8dbfe235c4b9508fed7e45fd4193218f0ebf809a0a73f414f05&o=&hp=1"
  >
    <CardTextArea textAlign="center">
      <CardTitle size="large">Chicago</CardTitle>
      <CardSubtitle>123 address right here, 129</CardSubtitle>
    </CardTextArea>
  </Card>
);
