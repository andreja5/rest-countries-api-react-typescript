import { AxiosResponse } from "axios";
import { CountryData } from "../interfaces/Country";
import BaseService from "./BaseService";
import handleExpectedError from "./ErrorService";

class CountriesService extends BaseService {
  private regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public countriesPath = 'rest/v2/all';
  public countryPath = 'rest/v2';

  /**
   * @description Creating query
   * 
   * @param query Fields or codes query
   * @param params Country fields
   */
  createQueryString = (query: string, params: string[]): string => {
    const joinedParams = params.join(';');
    
    return `?${query}=${joinedParams}`;
  }

  /**
   * @description Get countries by alpha code
   * 
   * @param code Country code
   */
  getByAlphaCode = (code: string[]): Promise<AxiosResponse<CountryData[]>> => {
    const alphaEndpoint = `${this.countryPath}/alpha`;

    const searchCode = Array.isArray(code) ? this.createQueryString("codes", code) : `/${code}`;

    const aplhaCodeEndPoint = alphaEndpoint + searchCode;

    return this.client.get(aplhaCodeEndPoint);
  }

  /**
   * @description Get countries
   * 
   * @param fields Country fields
   */
  public getCountries(fields: string[]) {
    if (!fields) return this.client.get(this.countriesPath);

    const queryString = this.createQueryString('fields', fields);

    return this.client.get(this.countriesPath + queryString);
  }

  /**
   * @description Get country
   * 
   * @param id Country id
   * @param fields Country fields
   */
  public getCountry(id: number, fields: string[]) {
    const countryPath = `${this.countryPath}/alpha/${id}`;

    if (!fields) return this.client.get(countryPath);

    const queryString = this.createQueryString('fields', fields);

    return this.client.get(countryPath + queryString);
  }

  /**
   * @description Get regions
   */
  public getRegions(): string[] {
    return this.regions;
  }

  /**
   * @description Load countries
   * 
   * @param fields Country fields
   * @param loadToCallBack Callback function
   */
  async loadCountries(fields: string[], loadToCallBack: any): Promise<void> {
    try {
      const { data } = await this.getCountries(fields);

      loadToCallBack(data);
    } catch (err) {
      handleExpectedError(err);
    }
  }

  /**
   * @description Load country
   * 
   * @param id Country id
   * @param fields Country fields
   * @param loadToCallBack Callback function
   */
  async loadCountry(id: number, fields: string[], loadToCallBack: any): Promise<void> {
    try {
      const { data } = await this.getCountry(id, fields);

      loadToCallBack(data);
    } catch (err) {
      handleExpectedError(err);
    }
  }

  /**
   * @description Returns lists with country code and country name
   * 
   * @param codes List of country codes
   * @param convertTo Name key
   */
  async convertCountryCode(codes: string[], convertTo: string): Promise<string[][] | undefined> {
    try {
        const { data } = await this.getByAlphaCode(codes);
        let count = 0;

        const converted = data.reduce((arr: string[][], obj: CountryData) => {
            const codeConvert = [codes[count], obj[convertTo as keyof CountryData]] as string[];
            count++;
            
            arr.push(codeConvert);

            return arr;
        }, []);

        return converted;
    } catch (ex) {
      handleExpectedError(ex);
    }
}

}

export default CountriesService;