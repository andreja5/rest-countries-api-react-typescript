import React, { FC } from 'react';
import './SelectInput.scss';

interface SelectInputProps {
  placeholder: string;
  options: string[];
  name: string;
  value: string;
  onInputChange: (event: any) => void;
}

const SelectInput: FC<SelectInputProps> = ({ placeholder, options, name, value, onInputChange }): JSX.Element => {
  return (
    <select
      name={name}
      className='select'
      value={value}
      aria-label='filter'
      onChange={(e) => onInputChange(e.currentTarget)}
    >
      {options.map((option): JSX.Element => (
        <option key={option}>{option}</option>
      ))}
    </select>
  )
}

export default SelectInput;