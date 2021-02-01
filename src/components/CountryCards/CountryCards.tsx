import React, { FC } from 'react';
import './CountryCards.scss';
import { Link } from 'react-router-dom';
import { convertToKeyValue } from '../../utils/filterMethods';
import Country from '../Country/Country';

interface CountriesCardsProps {
  countries: any[];
  display?: string[];
  id?: string;
}

export const CountryCards: FC<CountriesCardsProps> = ({ display=['population', 'region', 'capital'], id='alpha3Code', countries }):JSX.Element => {
  return (
    <section className='country-cards grid grid-l-4'>
        {countries?.map((country) => (
          <Link key={country[id]} to={`/country/${country[id].toLowerCase()}`}>
            <Country
              id={country.id}
              items={convertToKeyValue(country, display)}
              label={country.name}
              image={country.flag}
            />
          </Link>
        ))}
      </section>
  )
}
