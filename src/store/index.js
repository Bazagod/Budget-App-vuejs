import { createStore } from 'vuex';

const store = createStore({
  // État: Les données de votre application
  state: {
    transactions: [], // Tableau pour stocker toutes les transactions
  },

  // Mutations: Les seules fonctions qui peuvent modifier directement l'état.
  // Elles doivent être synchrones.
  mutations: {
    addTransaction(state, transaction) {
      state.transactions.push(transaction);
      // Optionnel: trier les transactions par ID pour que les plus récentes soient en haut
      state.transactions.sort((a, b) => b.id - a.id);
    },
    deleteTransaction(state, id) {
      state.transactions = state.transactions.filter(item => item.id !== id);
    },
    
  },

  // Actions: Fonctions qui déclenchent des mutations.
  // Elles peuvent contenir de la logique asynchrone (appels API, etc.)
  actions: {
    // Action pour ajouter une transaction. Elle valide et appelle la mutation.
    addTransaction({ commit }, newItem) {
      // Vous pourriez ajouter ici une logique de validation plus complexe
      // ou des appels API avant de commiter.
      commit('addTransaction', newItem);
    },
    // Action pour supprimer une transaction.
    deleteTransaction({ commit }, id) {
      // Vous pourriez ajouter ici une logique de confirmation ou des appels API.
      commit('deleteTransaction', id);
    },
  },

  // Getters: Fonctions pour obtenir des données dérivées de l'état.
  // Similaire aux computed properties pour le store.
  getters: {
    // Renvoie toutes les transactions (si vous avez des filtres, ce getter pourrait être plus complexe)
    allTransactions(state) {
      return state.transactions;
    },
    totalIncome(state) {
      return state.transactions
        .filter(item => item.type === 'inc')
        .reduce((acc, item) => acc + item.value, 0);
    },
    totalExpenses(state) {
      return state.transactions
        .filter(item => item.type === 'exp')
        .reduce((acc, item) => acc + item.value, 0);
    },
    // Vous pourriez ajouter un getter pour le budget total disponible
    totalBudget(state, getters) {
      return getters.totalIncome - getters.totalExpenses;
    },
    // Et le pourcentage des dépenses
    expensesPercentage(state, getters) {
      if (getters.totalIncome === 0) {
        return 'N/A';
      }
      return Math.round((getters.totalExpenses / getters.totalIncome) * 100);
    }
  }
});

export default store;