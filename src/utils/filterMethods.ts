import { CountryData, CountryInfoData, CountryItem } from "../interfaces/Country";
import { shouldAddCommas } from "./helperFunctions";

/**
 * @description Returns filtered countries by search or by select criteria
 * 
 * @param items Countries list
 * @param array List of filters
 */
export const multiPassFilter = (items: CountryData[], array: (string | ((item: CountryData) => boolean))[][]): CountryData[] => {
  let buffer = [...items];

  array.forEach((filters) => {
    const [value, filterBy] = filters;

    if (!value) return;

    buffer = buffer.filter(filterBy as (item: CountryData) => boolean);
  });

  return buffer;
}

/**
 * @description Returns list of keys which are part of obj
 * 
 * @param obj Country info data
 * @param wantedKeys List of keys
 */
const getAvailableKeys = (obj: CountryInfoData, wantedKeys: string[]): string[] => {
  const keys = Object.keys(obj);

  return wantedKeys?.filter((key: string) => keys.includes(key));
}

/**
 * @description Returns 
 * 
 * @param objToConvert Country info data
 * @param keys List of keys
 */
export const convertToKeyValue = (objToConvert: CountryInfoData, keys: string[]): any => {
  const availableKeys = getAvailableKeys(objToConvert, keys);

  const filtered = availableKeys.reduce((items: CountryItem[], currentKey: string) => {
    const key = currentKey.split(/(?=[A-Z])/).join(' ');
    const value = shouldAddCommas(objToConvert[currentKey as keyof CountryInfoData]);
    
    items?.push({ key, value });

    return items;
  }, [])

  return filtered;
}

/**
 * @description Returns list of all values for each country field
 * 
 * @param obj 
 * @param key 
 */
export const filterByKey = (obj: any[], key: string | number): string[] => {
  if (typeof key === "number") return obj;

  return obj.reduce((acc: any, obj: any) => [...acc, obj[key]], []);
}