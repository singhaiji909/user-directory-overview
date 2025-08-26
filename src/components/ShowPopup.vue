<template>
    <div v-if="showModal" class="modal-overlay">
  <div class="modal">
    <h2>Upload CSV File</h2>
    <input type="file" accept=".csv" @change="handleFileUpload" />
    <div class="modal-buttons">
      <button @click="showModal = false">Cancel</button>
    </div>
  </div>
</div>
</template>

<script setup>
import Papa from 'papaparse'
import { useUserDataStore } from '../store/useUserDataStore';
import { storeToRefs } from 'pinia';

const store = useUserDataStore();

const { user, showModal } = storeToRefs(store);


const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
      const newUsers = results.data.map(row => ({
        name: row.name,
        email: row.email,
        avatar: row.avatar || 'https://via.placeholder.com/80' // default avatar
      }))
      user.value.push(...newUsers)
      showModal.value = false
    }
  })
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  text-align: center;
}

.modal-buttons {
  margin-top: 1rem;
}
</style>