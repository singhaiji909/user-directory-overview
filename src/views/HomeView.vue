<template>
  <div>

    <SearchAndButton />
    <ShowPopup />

    <div 
      v-if="paginatedUsers.length"
      class="user-grid">
      <UserCard
        v-for="user in paginatedUsers"
        :key="user.email"
        :user="user"
        @delete="deleteUser(user.email)"
      />
    </div>
    <div v-else class="user-grid">
       <h1> NO DATA </h1>
    </div>

   <PaginationData />

  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import UserCard from '../components/UserCard.vue'
import SearchAndButton from '../components/SearchAndButton.vue'
import PaginationData from '../components/PaginationData.vue'
import ShowPopup from '../components/ShowPopup.vue'
import { useUserDataStore } from '../store/useUserDataStore';
import { storeToRefs } from 'pinia';
import userData from '../data/userData';

const store = useUserDataStore();

const { user, filteredData, currentPage, pageSize } = storeToRefs(store);


const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredData.value.length ? filteredData.value.slice(start, start + pageSize.value) : user.value.slice(start, start + pageSize.value)
})

const deleteUser = (email) => {
  const deletedUsers = user.value.filter(user => user.email !== email)
  const deletedFilterdedUsers = filteredData.value.filter(user => user.email !== email)
  store.setUserData(deletedUsers, 'deletedUsers');
  store.setFilteredData(deletedFilterdedUsers, 'deletedFilterdedUsers');
}

onMounted(() => {
  store.setUserData(userData)
})

</script>

<style scoped>
.user-grid {
  gap: 1rem;
  max-width: 1200px;
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  margin-inline: auto;
}
</style>
