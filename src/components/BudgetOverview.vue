<template>
  <div class="budget-header">
    <div class="header-background"></div>
    <div class="budget-content">
      <div class="budget-title">
        Available Budget in {{ currentMonthYear }}
      </div>
      <div v-if="isLoading" class="loading-message">Chargement du budget...</div>
      <div v-else-if="apiError" class="error-message">{{ apiError }}</div>
      <div v-else>
      <div class="budget-value">
          {{ formattedBudget }}
        </div>

        <div class="bottom">
          <div class="budget-income">
            <div class="budget-income__text">INCOME</div>
            <div class="budget-income__value">+ {{ formattedIncome }}</div>
          </div>
          <div class="budget-expenses">
            <div class="budget-expenses__text">EXPENSES</div>
            <div class="budget-expenses__value">
              - {{ formattedExpenses }}
              <span class="budget-expenses__percentage" v-if="expensesPercentage !== 'N/A'">
                {{ expensesPercentage }}%
              </span>
              <span class="budget-expenses__percentage" v-else>..</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore(); 

// Accéder aux getters du store
const totalIncome = computed(() => store.getters.totalIncome);
const totalExpenses = computed(() => store.getters.totalExpenses);
const totalBudget = computed(() => store.getters.totalBudget); 
const expensesPercentage = computed(() => store.getters.expensesPercentage);
const isLoading = computed(() => store.getters.getIsLoading);
const apiError = computed(() => store.getters.getApiError);


const currentMonthYear = computed(() => {
  const date = new Date();
  const options = { month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options); 
});

const formattedBudget = computed(() => totalBudget.value.toFixed(2));
const formattedIncome = computed(() => totalIncome.value.toFixed(2));
const formattedExpenses = computed(() => totalExpenses.value.toFixed(2));

onMounted(() => {
  store.dispatch('fetchTransactions');
});
</script>

<style scoped>
.budget-header {
  width: 100%;
  height: 40vh;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/bg.jpg');
  background-size: cover;
  background-position: center;
  filter: brightness(70%);
  z-index: 1;
}

.budget-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  width: 100%;
  max-width: 50rem;
}

.budget-title {
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 1rem;
}

.budget-value {
  font-size: 5rem;
  font-weight: 500;
  margin-bottom: 2rem;
  padding: 1rem 2rem;
  border-radius: 5px;
  min-width: 20rem;
  display: inline-block;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.bottom {
  display: flex;
  justify-content: space-around;
  width: 100%;
  gap: 2rem;
}

.budget-income,
.budget-expenses {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.budget-income {
  background-color: #28B9B9;
}

.budget-expenses {
  background-color: #FF5049;
}

.budget-income__text,
.budget-expenses__text {
  font-size: 1.4rem;
  font-weight: 400;
  text-transform: uppercase;
  margin-right: 1.5rem;
}

.budget-income__value,
.budget-expenses__value {
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: baseline;
  gap: 10px;
  white-space: nowrap;
}

.budget-expenses__percentage {
  font-size: 1.2rem;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0.3rem 0.6rem;
  border-radius: 3px;
}
.loading-message, .error-message {
  font-size: 1.8rem;
  font-weight: 500;
  color: #fff;
  padding: 2rem;
  text-align: center;
}

.error-message {
  background-color: rgba(255, 0, 0, 0.6);
  border-radius: 5px;
}
</style>