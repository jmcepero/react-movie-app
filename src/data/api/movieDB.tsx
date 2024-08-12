import axios from 'axios';

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '363b65a5ea601f4111fdddd19a87691a',
    language: 'en-US',
  },
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
  },
});

// Añadir un interceptor de solicitud
movieDB.interceptors.request.use(config => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(config);
    }, 2000); // Retraso de 2 segundos
  });
});

export default movieDB;
