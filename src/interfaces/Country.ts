export interface CountryData {
  alpha3Code: string;
  capital: string;
  flag: string;
  name: string;
  population: number;
  region: string;
}

export interface CountryItem {
  key: string;
  value: string;
}

export interface CountryInfoData extends CountryData {
  nativeName: string;
  subregion: string;
  topLevelDomain: string[];
  currencies: string[];
  languages: string[];
  borders: string[];
  
}