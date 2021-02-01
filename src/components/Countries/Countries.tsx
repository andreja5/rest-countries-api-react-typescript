import React, { FC, useEffect, useReducer, useState } from 'react';
import './Countries.scss';
import FilterInputs from '../FilterInputs/FilterInputs';
import { filterReducer } from '../../hooks/filterReducers';
import { CountryCards } from '../CountryCards/CountryCards';
import { CountryData } from '../../interfaces/Country';
import { criteria, searchString } from '../../utils/filterByExpressions';
import { multiPassFilter } from '../../utils/filterMethods';

interface CountriesProps {
  countries: CountryData[];
}

const filterDefaults = { search: '', region: '' };

const Countries: FC<CountriesProps> = ({ countries }): JSX.Element => {
  const [filter, dispathFilter] = useReducer(filterReducer, filterDefaults);
  const [filteredCountries, setFilteredCountries] = useState([] as CountryData[]);

  /**
   * Set state with filtered countries by search or by select criteria
   */
  const filterCountries = (): void => {
    const { search, region } = filter as typeof filterDefaults;

    const filters = [
      [search, searchString('name', search)],
      [region, criteria('region', region)]
    ];

    const filtered = multiPassFilter(countries, filters);
    
    setFilteredCountries(filtered);
  }

  /**
   * Returns filtered countries if user use some of filter options or all countries if user didn't use any of filter options
   */
  const deployCoutriesList = (): CountryData[] => {
    const { search, region } = filter as typeof filterDefaults;

    if (!search && !region) return countries;

    return filteredCountries;
  }

  useEffect((): void => {
    filterCountries();
  }, [filter]);
  return (
    <div className='countries'>
      <FilterInputs inputData={[filter, dispathFilter]} />

      <CountryCards countries={deployCoutriesList()} />
    </div>
  )
}

export default Countries;