import { CountryData } from "../interfaces/Country";

/**
 * @description Returns function which gives us true/false value for country name if starts with search input or not
 * 
 * @param key Country name
 * @param searchString Search input
 */
export const searchString = (key: string, searchString: string): (item: CountryData) => boolean => {
  return function(item: CountryData): boolean {
    const itemToFilter = item[key as keyof CountryData].toString().toLowerCase();
    const search = searchString.toLowerCase();

    return itemToFilter.startsWith(search);
  }
}

/**
 * @description Returns function which gives us true/false value if country region is equal with select filter or not
 * 
 * @param key Country region
 * @param criteria Select input
 */
export const criteria = (key: string, criteria: string): (item: CountryData) => boolean => {
  return function(item: CountryData): boolean {
    const itemToFilter = item[key as keyof CountryData];
    
    return itemToFilter === criteria;
  }
}
