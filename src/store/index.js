import { createStore } from 'vuex';

const store = createStore({
  
  state: {
    transactions: [], 
  },

  
  mutations: {
    addTransaction(state, transaction) {
      state.transactions.push(transaction);
      state.transactions.sort((a, b) => b.id - a.id);
    },
    deleteTransaction(state, id) {
      state.transactions = state.transactions.filter(item => item.id !== id);
    },
    
  },


  actions: {
  
    addTransaction({ commit }, newItem) {
      commit('addTransaction', newItem);
    },
    deleteTransaction({ commit }, id) {
      commit('deleteTransaction', id);
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
      return Math.round((getters.totalExpenses / getters.totalIncome) * 100);
    }
  }
});

export default store;