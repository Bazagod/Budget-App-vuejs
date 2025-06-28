import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', //l'URL de base de JSONPlaceholder
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


apiClient.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      console.error(`Erreur HTTP ${error.response.status}:`, error.response.data);
    } else if (error.request) {
      console.error("Aucune réponse reçue du serveur.");
    } else {
      console.error("Erreur lors de la configuration de la requête:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;