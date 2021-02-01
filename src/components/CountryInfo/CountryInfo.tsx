import React, { FC, useEffect, useState } from 'react';
import './CountryInfo.scss';
import LinkButton from '../LinkButton/LinkButton';
import BordersList from '../BorderList/BorderList';
import ItemsList from '../ItemsList/ItemsList';
import Loading from '../Loading/Loading';
import CountriesService from '../../services/CountriesService';
import { convertToKeyValue } from '../../utils/filterMethods';
import { getNestedDetails } from '../../utils/helperFunctions';
import { CountryInfoData } from '../../interfaces/Country';

interface CountryInfoProps {
  match: any;
}

const countryFields = [
  "nativeName",
  "population",
  "region",
  "subregion",
  "capital",
  "topLevelDomain",
  "currencies",
  "languages",
  "borders",
  "name",
  "flag",
];

const CountryInfo: FC<CountryInfoProps> = ({ match }): JSX.Element => {
  const { id } = match.params;
  const [firstList, setFirstList] = useState([]);
  const [secondList, setSecondList] = useState([]);
  const [borders, setBorders] = useState([] as string[][] | null);
  const [flag, setFlag] = useState("");
  const [name, setName] = useState("");

  const countriesService = new CountriesService();

  /**
   * @description Load first list with information about native name, population, region, subregion and capital
   * 
   * @param countryData Country data
   */
  const loadFirstList = (countryData: CountryInfoData): void => {
    const firstListDisplay = countryFields.slice(0, 5);

    const firstListData = convertToKeyValue(countryData, firstListDisplay);

    setFirstList(firstListData);
  }

  /**
   * @description Load second list with information about top level domain, currencies and languages
   * 
   * @param countryData Country data
   */
  const loadSecondList = (countryData: CountryInfoData): void => {
      const secondListDisplay = countryFields.slice(5, 8);
      const secondListKeys = [0, "name", "name"];

      const parsedDetails = getNestedDetails(countryData, secondListDisplay, secondListKeys);
      const secondListData = convertToKeyValue(parsedDetails, secondListDisplay);

      setSecondList(secondListData);
  }

  /**
   * @description Load borders data
   * 
   * @param bordersData Borders data
   */
  const loadBordersData = (bordersData: string[]): undefined => {
      if (bordersData.length === 0) {
          setBorders(null);
          return;
      }

      const convertedData = countriesService.convertCountryCode(bordersData, "name");

      convertedData.then((borders: string[][] | undefined) => {
          if (borders?.length) {
              setBorders(borders);
          }
      });
  }

  /**
   * @description Country data handler
   * 
   * @param countryData Country info data
   */
  const countryDataHandler = (countryData: CountryInfoData): void => {
      const { name, flag, borders } = countryData;

      loadFirstList(countryData);
      loadSecondList(countryData);
      loadBordersData(borders);
      setFlag(flag);
      setName(name);
  }

  /**
   * @description Reset all states
   */
  const resetStates = (): void => {
      setFirstList([]);
      setSecondList([]);
      setBorders([]);
      setFlag("");
      setName("");
  }

  useEffect(() => {
      resetStates();
      countriesService.loadCountry(id, countryFields, countryDataHandler);
  }, [id]);

  return (
    <>
      {!name ? (
          <Loading dependency={name} />
      ) : (
          <div className="country-info">
              <LinkButton to="/" label="Back" icon="fa fa-arrow-left" />
              <div className="l-flex-spaced country-info-wrapper">
                  <img src={flag} alt={name} className="country-info-wrapper-img" />
                  <div className="l-grid-2 country-info-wrapper-details">
                      <h2 className="country-info-wrapper-details-label">{name}</h2>
                      <ItemsList items={firstList} />
                      <ItemsList items={secondList} />
                      {borders && (
                          <BordersList
                              items={borders}
                              label="Border Countries:"
                          />
                      )}
                  </div>
              </div>
          </div>
      )}
    </>
  )
}

export default CountryInfo;
