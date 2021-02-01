import { AxiosInstance } from "axios";
import client from './Client';

export default class BaseService {
  protected client: AxiosInstance;

  constructor() {
    this.client = client;
  }
}