import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.openweathermap.org',
  params: { 
    appId: '49cc8c821cd2aff9af04c9f98c36eb74'
  }
});