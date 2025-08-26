<template>
    <div class="pagination">
        <button
        @click="prevPage"
        :class="currentPage !== 1 ? 'next-btn' : 'disabled'"
        :disabled="currentPage === 1"
        >Prev</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
        @click="nextPage"
        :class="currentPage !== totalPages ? 'next-btn': 'disabled'"
        :disabled="currentPage === totalPages"
        >Next</button>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useUserDataStore } from '../store/useUserDataStore';
import { storeToRefs } from 'pinia';

// Sample static user data
const store = useUserDataStore();

const { user, filteredData, currentPage, pageSize } = storeToRefs(store)

const totalPages = computed(() => Math.ceil((filteredData.value.length ? filteredData.value.length : user.value.length) / pageSize.value))

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    store.setCurrentPage('inc')
  }
}

const prevPage = () => {
  if (currentPage.value > 1) store.setCurrentPage('dec')
}
</script>

<style scoped>
.pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.next-btn {
  padding: 0.5rem 1rem;
  background-color: #0b5ed7;
  color: white;
  border: none;
  border-radius: 5px;
}

.disabled {
  padding: 0.5rem 1rem;
  background-color: #808080;
  color: white;
  border: none;
  border-radius: 5px;
}
</style>
