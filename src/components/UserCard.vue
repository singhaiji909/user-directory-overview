<template>
  <div class="card">
    <img :src="user.avatar" alt="User Avatar" class="avatar" />
    <h3>{{ user.name }}</h3>
    <p>{{ user.email }}</p>
    <button class="delete-btn" @click="$emit('delete')"><img class="trash" :src="trashCan"/></button>
  </div>
</template>

<script setup>
import trashCan from '../components/icons/waste.png'
defineProps(['user'])
defineEmits(['delete'])
</script>

<style scoped>
.card {
  position: relative;
  background: #fff;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  border-radius: 8px;
  overflow: hidden;
  padding-bottom: 24px;
  box-shadow: 0 0 8px 0px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
}

h3 {
    font-weight: bold
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

.delete-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.trash {
  width:25px;
  background-color: 0b5ed7;
}
</style>
