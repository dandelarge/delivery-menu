import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? '': 'http://192.168.1.14:3012/';

export function getAccessTokenFromLocalStorage() {
  return localStorage.getItem('access_token');
}

export function setAccessTokenInLocalStorage(token: string) {
  localStorage.setItem('access_token', token);
}

const baseConfig: Partial<AxiosRequestConfig> = {
  baseURL,
  timeout: 1000
};

export const client = axios.create(baseConfig);

client.interceptors.request.use( config => {
  const accessToken = getAccessTokenFromLocalStorage();
  let headers: AxiosRequestHeaders = {};
  if(accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return {...config, headers};
}, error => {
  console.log(error);
});