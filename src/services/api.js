// src/plugins/axios.js

import axios from 'axios';

// Créez une instance personnalisée d'Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Remplacez par l'URL de base de votre API
  timeout: 10000, // Temps d'attente maximum pour une réponse (en ms)
  headers: {
    'Content-Type': 'application/json',
    // Autres en-têtes communs, par exemple pour l'authentification
    // 'Authorization': `Bearer ${localStorage.getItem('token')}` // Exemple
  },
});

// --- Intercepteurs (Optionnel mais fortement recommandé) ---

// Intercepteur de requêtes : exécute une fonction avant que chaque requête ne soit envoyée
apiClient.interceptors.request.use(
  config => {
    // Par exemple, vous pouvez ajouter un jeton d'authentification ici
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // console.log('Requête envoyée:', config); // Utile pour le débogage
    return config;
  },
  error => {
    // Gérer les erreurs de requête
    return Promise.reject(error);
  }
);

// Intercepteur de réponses : exécute une fonction après avoir reçu une réponse
apiClient.interceptors.response.use(
  response => {
    // Par exemple, vous pouvez transformer la réponse avant qu'elle ne soit traitée par votre code
    // console.log('Réponse reçue:', response); // Utile pour le débogage
    return response;
  },
  error => {
    // Gérer les erreurs de réponse (codes d'état HTTP comme 401, 403, 500)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Gérer l'authentification expirée / non autorisée
          console.error("Non autorisé. Redirection vers la page de connexion...");
          // Exemple : router.push('/login');
          break;
        case 403:
          console.error("Accès refusé.");
          break;
        case 500:
          console.error("Erreur serveur interne.");
          break;
        default:
          console.error(`Erreur ${error.response.status}:`, error.response.data);
      }
    } else if (error.request) {
      // La requête a été faite mais aucune réponse n'a été reçue
      console.error("Aucune réponse du serveur. Vérifiez votre connexion réseau.");
    } else {
      // Quelque chose s'est passé lors de la configuration de la requête qui a déclenché une erreur
      console.error("Erreur de requête Axios:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;