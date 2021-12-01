import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost/verkkopalveluprojekti2021-backend',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
});

export default axiosInstance;
