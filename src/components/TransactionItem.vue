<template>
  <div class="item clearfix">
    <div class="item__description">{{ item.description }}</div>
    <div class="right clearfix">
      <div class="item__value" :class="{ 'item__value--inc': item.type === 'inc', 'item__value--exp': item.type === 'exp' }">
        {{ formattedValue }}
      </div>
      <div class="item__delete">
        <button class="item__delete--btn" @click="deleteItem">
          <font-awesome-icon icon="times-circle" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
  name: 'TransactionItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup() {
    const store = useStore();
    return { store };
  },
  computed: {
    formattedValue() {
      const sign = this.item.type === 'inc' ? '+' : '-';
      return `${sign} ${this.item.value.toFixed(2)}`;
    }
  },
  methods: {
    deleteItem() {
      // Dispatche l'action 'deleteTransaction' au lieu d'émettre un événement
      this.store.dispatch('deleteTransaction', this.item.id);
    }
  }
}
</script>

<style scoped>
.item {
  background-color: #fff;
  border: 1px solid #e7e7e7;
  padding: 1.3rem 2rem;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.item:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.item__description {
  font-size: 1.6rem;
  color: #555;
  flex: 1;
}

.right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.item__value {
  font-size: 1.6rem;
  font-weight: 500;
  text-align: right;
  min-width: 8rem;
}

.item__value--inc {
  color: #28B9B9;
}

.item__value--exp {
  color: #FF5049;
}

.item__delete {
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
  transition: color 0.2s;
  opacity: 0;
  visibility: hidden;
}

.item:hover .item__delete {
  opacity: 1;
  visibility: visible;
  color: #FF5049;
}

.item__delete--btn {
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  outline: none;
}

.item__delete--btn:active {
  transform: translateY(1px);
}
</style>