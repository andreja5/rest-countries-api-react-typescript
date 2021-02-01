import { useEffect, useState } from "react";
import { CountryData } from "../interfaces/Country";
import CountriesService from "../services/CountriesService";

/**
 * @description Returns all countries from API
 * 
 * @param fields Country fields that we need to display for user
 */
export const useGetCountries = (fields: string[]): CountryData[] => {
  const [countries, setCountries] = useState([] as CountryData[]);
  const countriesService = new CountriesService();

  useEffect((): void => {
    countriesService.loadCountries(fields, setCountries);
  }, []);

  return countries;
}