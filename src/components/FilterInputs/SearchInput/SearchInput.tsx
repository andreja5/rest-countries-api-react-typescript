import React, { FC } from 'react';
import './SearchInput.scss';

interface SearchInputProps {
  placeholder: string;
  onSearch: (event: any) => void;
  name: string;
  value: string;
}

const SearchInput: FC<SearchInputProps> = ({ placeholder, onSearch, name, value }): JSX.Element => {
  return (
    <div className='search'>
      <i className='fas fa-search search-icon' />
      <input 
        type='text'
        value={value}
        name={name ?? 'search'}
        aria-label='search'
        placeholder={placeholder ?? 'Search...'}
        className='search-box'
        onChange={(e): void => onSearch(e.currentTarget)}
      />
    </div>
  );
}

export default SearchInput;