import React, { FC } from 'react';
import './FilterInputs.scss';
import CountriesService from '../../services/CountriesService';
import SearchInput from './SearchInput/SearchInput';
import SelectInput from './SelectInput/SelectInput';

interface FilterInputsProps {
  inputData: any[];
}

const FilterInputs: FC<FilterInputsProps> = ({ inputData }): JSX.Element => {
  const [filter, dispathFilter] = inputData;
  const { search, region } = filter as any;

  const countriesService = new CountriesService();
  const allRegions = countriesService.getRegions();

  /**
   * @description Triggers every time user types in search input or when user select region
   * 
   * @param event Search event or select event
   */
  const handleFilter = (event: any): void => {
    dispathFilter({ name: event.name, value: event.value });
  }

  return (
    <div className='filter-inputs'>
      <SearchInput 
        placeholder='Search for a country...'
        value={search}
        name='search'
        onSearch={handleFilter}
      />
      <SelectInput 
        placeholder='Filter By Region'
        value={region}
        name='region'
        onInputChange={handleFilter}
        options={allRegions}
      />
    </div>
  )
}

export default FilterInputs;