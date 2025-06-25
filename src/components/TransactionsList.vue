<template>
  <div class="container clearfix">
    <div class="income">
      <h2 class="income__title">INCOME</h2>
      <div class="income__list">
        <TransactionItem
          v-for="item in incomeItems"
          :key="item.id"
          :item="item"
          @delete-item="$emit('delete-item', $event)"
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
          @delete-item="$emit('delete-item', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TransactionItem from './TransactionItem.vue';

export default {
  name: 'TransactionsList',
  components: {
    TransactionItem
  },
  props: {
    transactions: {
      type: Array,
      required: true
    }
  },
  computed: {
    incomeItems() {
      return this.transactions.filter(item => item.type === 'inc');
    },
    expenseItems() {
      return this.transactions.filter(item => item.type === 'exp');
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 90rem; /* Largeur maximale pour le contenu */
  display: flex;
  flex-wrap: wrap; /* Permet aux colonnes de passer à la ligne sur petits écrans */
  justify-content: center;
  gap: 3rem; /* Espacement entre les colonnes */
  padding: 0 2rem; /* Padding horizontal */
}

.income,
.expenses {
  flex: 1; /* Prend l'espace disponible */
  min-width: 30rem; /* Largeur minimale avant de passer à la ligne */
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
  gap: 1rem; /* Espacement entre les items de la liste */
}
</style>