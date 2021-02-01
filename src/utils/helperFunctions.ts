import { CountryInfoData } from "../interfaces/Country";
import { filterByKey } from "./filterMethods";

/**
 * @description Returns numers as string separated with comma
 * 
 * @param num Item value which type is number
 */
export const addCommas = (num: number): string => {
  let count = 0;
  const reverseDigits = num.toString().split('');

  const separatedDigits = reverseDigits.reduce((acc, digit): any => {
    count++;
    const { length } = reverseDigits;
    let addSeparator = '';

    if (length - count !== 0 && (length - count) % 3 === 0)  {
      addSeparator = ', ';
    }

    return acc + digit + addSeparator;
  }, '')

  return separatedDigits;
}

/**
 * @description If item is number return function addCommas otherwise return that item
 * 
 * @param item Item value
 */
export const shouldAddCommas = (itemValue: string | number | string[]): any => {
  const isNumber = typeof itemValue === 'number';

  return isNumber ? addCommas(itemValue as number) : itemValue;
}

export const shorten = (phrase: string, char: number): string => {
  if (phrase.length > char) {
      const words = phrase.split(" ");
      return words[0];
  }

  return phrase;
}

/**
 * @description Returns all nested information for country items
 * 
 * @param obj Country info data
 * @param fields topLevelDomain, currencies, languages fields
 * @param keyToParse Keys which needs to be parsed
 */
export const getNestedDetails = (obj: CountryInfoData, fields: string[], keyToParse: any[]): any => {
  let parsedObj: CountryInfoData | {} = {};

  for (let i = 0; i < fields.length; i++) {
      const field = fields[i] as keyof typeof parsedObj;
      const key = keyToParse[i];
      const objToParse = obj[field];

      (parsedObj[field] as any) = filterByKey(objToParse, key).join(", ");
  }

  return parsedObj;
}