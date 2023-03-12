import * as dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.BASE_URL_API;
const API_KEY = process.env.API_KEY;

const getUrl = (path, query = {}) => {
  const qs = new URLSearchParams(query);
  return `${BASE_URL}/${path}?api_key=${API_KEY}&${qs}`;
};

export default getUrl;
