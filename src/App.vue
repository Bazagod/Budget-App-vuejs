<template>
  <div id="app">
    <BudgetOverview /> 
    <InputForm />
    <TransactionsList />
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
  background-color: #f7f7f7;
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