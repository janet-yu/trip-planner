import React from 'react';
import { default as SearchbarComponent } from '../components/Searchbar';

export default {
  title: 'Searchbar',
  component: SearchbarComponent,
};

export const Searchbar = () => (
  <SearchbarComponent
    inputName="name"
    handleItemClick={() => {}}
    items={[]}
    onChange={() => {}}
    value={''}
  />
);
