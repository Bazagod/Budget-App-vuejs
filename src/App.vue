<template>
  <div id="app">
    <BudgetOverview :total-income="totalIncome" :total-expenses="totalExpenses" />
    <InputForm @add-item="handleAddItem" />
    <TransactionsList :transactions="transactions" @delete-item="handleDeleteItem" />
  </div>
</template>

<script>
import BudgetOverview from './components/BudgetOverview.vue';
import InputForm from './components/InputForm.vue';
import TransactionsList from './components/TransactionsList.vue';

export default {
  name: 'App',
  components: {
    BudgetOverview,
    InputForm,
    TransactionsList
  },
  data() {
    return {
      transactions: [] // Tableau pour stocker toutes les transactions
    };
  },
  computed: {
    totalIncome() {
      return this.transactions
        .filter(item => item.type === 'inc')
        .reduce((acc, item) => acc + item.value, 0);
    },
    totalExpenses() {
      return this.transactions
        .filter(item => item.type === 'exp')
        .reduce((acc, item) => acc + item.value, 0);
    }
  },
  methods: {
    handleAddItem(newItem) {
      this.transactions.push(newItem);
      // Optionnel: trier les transactions par date ou ID si nécessaire
      this.transactions.sort((a, b) => b.id - a.id); // Les plus récentes en premier
    },
    handleDeleteItem(id) {
      this.transactions = this.transactions.filter(item => item.id !== id);
    }
  }
}
</script>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%; 
}

body {
  font-family: 'Open Sans', sans-serif; 
  font-size: 1.6rem;
  background-color: #f7f7f7; /* Couleur de fond de l'image */
  color: #555;
  min-height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; 
}

</style>