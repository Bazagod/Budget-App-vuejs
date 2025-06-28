import { createStore } from 'vuex';
import apiClient from '@/services/api'; 

const store = createStore({

  state: {
    transactions: [],
    isLoading: false, 
    error: null,      
  },


  mutations: {
    setTransactions(state, transactions) {
      state.transactions = transactions.map(post => ({
        id: post.id,
        type: post.id % 2 === 0 ? 'exp' : 'inc',
        description: post.title,
        value: parseFloat((post.id * 10).toFixed(2)),
      })).sort((a, b) => b.id - a.id); 
    },
    addTransaction(state, transaction) {
      state.transactions.unshift(transaction);
      state.transactions.sort((a, b) => b.id - a.id);
    },
    deleteTransaction(state, id) {
      state.transactions = state.transactions.filter(item => item.id !== id);
    },
    setLoading(state, status) {
      state.isLoading = status;
    },
    setError(state, message) {
      state.error = message;
    },
  },


  actions: {
    async fetchTransactions({ commit }) {
      commit('setLoading', true);
      commit('setError', null);
      try {
        const response = await apiClient.get('/posts?_limit=10');
        commit('setTransactions', response.data);
      } catch (error) {
        commit('setError', 'Erreur lors de la récupération des transactions.');
        console.error("Erreur fetchTransactions:", error);
      } finally {
        commit('setLoading', false);
      }
    },

    // Action pour ajouter une transaction
    async addTransaction({ commit }, newItem) {
      commit('setLoading', true);
      commit('setError', null);
      try {
      
        const postData = {
          title: newItem.description,
          body: `Value: ${newItem.value} Type: ${newItem.type}`, // Simule le corps du post
          userId: 1,
        };

        const response = await apiClient.post('/posts', postData);

        const createdPost = response.data;

        const transactionToAdd = {
          id: createdPost.id, // L'ID vient de l'API
          type: newItem.type,
          description: newItem.description,
          value: newItem.value,
        };

        commit('addTransaction', transactionToAdd); // Mettre à jour l'état local
      } catch (error) {
        commit('setError', 'Erreur lors de l\'ajout de la transaction.');
        console.error("Erreur addTransaction:", error);
      } finally {
        commit('setLoading', false);
      }
    },

    async deleteTransaction({ commit }, id) {
      commit('setLoading', true);
      commit('setError', null);
      try {
        await apiClient.delete(`/posts/${id}`);

        commit('deleteTransaction', id);
      } catch (error) {
        commit('setError', `Erreur lors de la suppression de la transaction avec l'ID ${id}.`);
        console.error("Erreur deleteTransaction:", error);
      } finally {
        commit('setLoading', false);
      }
    },
  },

  getters: {
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
    totalBudget(state, getters) {
      return getters.totalIncome - getters.totalExpenses;
    },
    expensesPercentage(state, getters) {
      if (getters.totalIncome === 0) {
        return 'N/A';
      }
      
      const percentage = (getters.totalExpenses / getters.totalIncome) * 100;
      return Math.round(percentage);
    },
  
    getIsLoading: (state) => state.isLoading,
    getApiError: (state) => state.error,
  }
});

export default store;