<template>
  <div class="budget-header">
    <div class="header-background"></div>
    <div class="budget-content">
      <div class="budget-title">
        Available Budget in {{ currentMonthYear }}
      </div>
      <div class="budget-value" :class="{ 'budget-value--red': totalBudget < 0, 'budget-value--green': totalBudget > 0 }">
        {{ formattedBudget }}
      </div>

      <div class="bottom">
        <div class="budget-income">
          <div class="budget-income__text">INCOME</div>
          <div class="budget-income__value">+ {{ formattedIncome }}</div>
        </div>
        <div class="budget-expenses">
          <div class="budget-expenses__text">EXPENSES</div>
          <div class="budget-expenses__value">- {{ formattedExpenses }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BudgetOverview',
  props: {
    totalIncome: {
      type: Number,
      required: true
    },
    totalExpenses: {
      type: Number,
      required: true
    }
  },
  computed: {
    totalBudget() {
      return this.totalIncome - this.totalExpenses;
    },
    currentMonthYear() {
      const date = new Date();
      const options = { month: 'long', year: 'numeric' };
      return date.toLocaleDateString('en-US', options); // Ou 'fr-FR' si vous préférez en français
    },
    formattedBudget() {
      // Formatage du budget pour afficher les décimales et le signe
      return this.totalBudget.toFixed(2);
    },
    formattedIncome() {
      return this.totalIncome.toFixed(2);
    },
    formattedExpenses() {
      return this.totalExpenses.toFixed(2);
    }
  }
}
</script>

<style scoped>
.budget-header {
  width: 100%;
  height: 40vh; /* Hauteur relative pour la bannière */
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Petite ombre */
}

.header-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/home/bazagod/budget-app/src/assets/bg.jpg'); 
  background-size: cover;
  background-position: center;
  filter: brightness(70%); /* Assombrit un peu l'image pour la lisibilité du texte */
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
  max-width: 50rem; /* Limite la largeur du contenu central */
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
  min-width: 20rem; /* Pour éviter que le texte ne se déplace trop si le chiffre est petit */
  display: inline-block; /* Pour que le background-color s'applique bien */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
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
  flex: 1; /* Distribue l'espace équitablement */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.budget-income {
  background-color: #28B9B9; /* Vert */
}

.budget-expenses {
  background-color: #FF5049; /* Rouge */
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
  font-size: 2rem;
  font-weight: 500;
}
</style>