<template>
  <div class="add-container">
    <div class="add-wrapper">
      <select class="add__type" v-model="type">
        <option value="inc" selected>+</option>
        <option value="exp">-</option>
      </select>
      <input
        type="text"
        class="add__description"
        placeholder="Add description"
        v-model="description"
        @keyup.enter="addItem"
      />
      <input
        type="number"
        class="add__value"
        placeholder="Value"
        step="0.01"
        v-model.number="value"
        @keyup.enter="addItem"
      />
      <button class="add__btn" @click="addItem">
        <font-awesome-icon icon="check-circle" />
      </button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'; 

export default {
  name: 'InputForm',
  data() {
    return {
      type: 'inc',
      description: '',
      value: null
    };
  },
  setup() {
    const store = useStore();
    return { store };
  },
  methods: {
    addItem() {
      if (!this.description || this.value === null || this.value <= 0) {
        alert('Please provide a valid description and a positive value.');
        return;
      }

      const newItem = {
        id: Date.now(), 
        type: this.type,
        description: this.description,
        value: parseFloat(this.value)
      };

      // Dispatche l'action 'addTransaction' au lieu d'émettre un événement
      this.store.dispatch('addTransaction', newItem); 

      // Réinitialiser le formulaire
      this.description = '';
      this.value = null;
    }
  }
}
</script>

<style scoped>
.add-container {
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #f7f7f7;
  padding: 1.5rem;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
}

.add-wrapper {
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
  max-width: 60rem;
}

.add__type {
  width: 5rem;
  border: 1px solid #e7e7e7;
  height: 4rem;
  font-size: 1.8rem;
  color: inherit;
  background-color: #fff;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
}

.add__description,
.add__value {
  border: 1px solid #e7e7e7;
  background-color: #fff;
  border-radius: 5px;
  padding: 0.8rem 1rem;
  font-size: 1.6rem;
  width: 100%;
  transition: border 0.3s;
}

.add__description:focus,
.add__value:focus {
  outline: none;
  border-color: #28B9B9;
}

.add__type:focus.add__type[value="exp"] {
    border-color: #FF5049;
}
.add__type[value="exp"] + .add__description:focus,
.add__type[value="exp"] + .add__description + .add__value:focus {
    border-color: #FF5049;
}

.add__btn {
  background: none;
  border: none;
  font-size: 2.5rem;
  color: #28B9B9;
  cursor: pointer;
  transition: color 0.2s;
  outline: none;
}

.add__type[value="exp"] ~ .add__btn {
  color: #FF5049;
}

.add__btn:active {
  transform: translateY(1px);
}
</style>