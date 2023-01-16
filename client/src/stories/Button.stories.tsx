import React from 'react';
import Button from '../components/Button';

export default {
  title: 'Button',
  component: Button,
};

export const PrimaryButton = () => (
  <Button variant="primary" onClick={() => {}}>
    Primary Button
  </Button>
);

export const SecondaryButton = () => (
  <Button variant="secondary" onClick={() => {}}>
    Secondary Button
  </Button>
);

export const SelectedButton = () => (
  <Button variant="primary" selected onClick={() => {}}>
    Selected Button
  </Button>
);
