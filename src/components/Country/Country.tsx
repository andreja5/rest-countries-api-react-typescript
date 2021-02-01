import React, { FC } from 'react';
import ItemsList from '../ItemsList/ItemsList';
import './Country.scss';

interface CountryProps {
  items: any[];
  label: string;
  image: string;
  id: any;
  withIdentifier?: boolean;
}

const Country: FC<CountryProps> = ({ withIdentifier=true, items, label, image, id }): JSX.Element => {
  return (
    <div className='country'>
      <img src={image} alt="name" data-src={image} className='country-img' />

      <ItemsList items={items} label={label} />
    </div>
  )
}

export default Country;