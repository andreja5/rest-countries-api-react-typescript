import axios from 'axios';

/** It should be saved on server for example in process.env global variable */
const url = 'https://restcountries.eu/';

/** Axios client for http communication */
const client = axios.create({
  baseURL: url,
});

export default client;