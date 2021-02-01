import React, { FC } from 'react';
import { CountryItem } from '../../interfaces/Country';
import './ItemsList.scss';

interface ItemsListProps {
  items: any[];
  label?: string;
  withIdentifier?: boolean;
}

const ItemsList: FC<ItemsListProps> = ({ items, label, withIdentifier=true }): JSX.Element => {
  /**
   * @description Renders country name
   * 
   * @param label Country name
   */
  const renderLabel = (label?: string): JSX.Element | null => {
    if (!label) return null;

    return (
      <li>
        <h2 className='country-items-label'>{label}</h2>
      </li>
    )
  }

  /**
   * @description Renders identifier for each country items list
   * 
   * @param key Population, region and capital
   */
  const renderIdentifier = (key: string): JSX.Element => {
    const identifier = `${key}: `;

    return (
      <span className='country-items-item-identifier'>
        {identifier}
      </span>
    )
  }

  /**
   * @description Renders list of country item
   * 
   * @param item Country item
   * @param render Flag on which depend how to render items list
   */
  const renderItem = (item: CountryItem, render: boolean): JSX.Element => {
    const { key, value } = item;

    return (
      <li key={key} className='country-items-item'>
        {render && renderIdentifier(key)}
        {render ? value : item}
      </li>
    );
  }

  return (
    <ul className='country-items'>
        {renderLabel(label)}
        {items?.map((item: any) => renderItem(item, withIdentifier))}
      </ul>
  )
}

export default ItemsList;