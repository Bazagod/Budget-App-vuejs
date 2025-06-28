<template>
  <div class="container clearfix">
    <div class="income">
      <h2 class="income__title">INCOME</h2>
      <div class="income__list">
        <TransactionItem
          v-for="item in incomeItems"
          :key="item.id"
          :item="item"
          />
      </div>
    </div>

    <div class="expenses">
      <h2 class="expenses__title">EXPENSES</h2>
      <div class="expenses__list">
        <TransactionItem
          v-for="item in expenseItems"
          :key="item.id"
          :item="item"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import TransactionItem from './TransactionItem.vue';
import { useStore} from 'vuex';
import { computed } from 'vue';

const store = useStore(); 
const transactions = computed(() => store.state.transactions);
const incomeItems = computed(() => 
  transactions.value.filter(item => item.type === 'inc')
);

const expenseItems = computed(() =>
  transactions.value.filter(item => item.type === 'exp')
);
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 90rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  padding: 0 2rem;
}

.income,
.expenses {
  flex: 1;
  min-width: 30rem;
}

h2 {
  text-transform: uppercase;
  font-size: 1.8rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
}

.income__title {
  color: #28B9B9;
}

.expenses__title {
  color: #FF5049;
}

.income__list,
.expenses__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>