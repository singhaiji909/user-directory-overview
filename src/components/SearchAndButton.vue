<template>
  <div>
    <div class="header">
      <input type="text" v-model="searchQuery" @input= 'filterUser' placeholder="Search by name or email..." />
      <span>
        {{ `Page ${currentPage}` }} 
        <button @click="openModal" class="add-btn"> <img :src='plus'/>Add Users (CSV)</button>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import plus from '../components/icons/plus.png';
import { useUserDataStore } from '../store/useUserDataStore';
import { storeToRefs } from 'pinia';

const store = useUserDataStore();

const searchQuery = ref('')
const { user, currentPage } = storeToRefs(store);


const filterUser = () => {
  const filteredData = user.value.filter(user =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
  store.setFilteredData(filteredData);
}

const openModal = () => {
  store.toggelModal(true);
}

</script>

<style scoped>

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.header input {
  width: 20%;
  padding: 0.5rem;
  font-size: 1rem;
}

.add-btn {
  padding: 0.5rem 1rem;
  background-color: #0b5ed7;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

img {
  max-width:12px;
  height: 10px;
  padding-right: 4px;
}


</style>
