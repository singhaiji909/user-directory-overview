import { defineStore } from 'pinia';
import { computed, ref } from 'vue'

export const useUserDataStore = defineStore('counter', () => {
  const user = ref([]);
  const filteredData = ref([]);
  const searchInput = ref('');
  const currentPage = ref(1);
  const pageSize = ref(6);
  const showModal = ref(false);
  
  const setUserData = (data) => {
    user.value = data;
  }

  const setSearchQuery = (data) => {
    searchInput.value = data;
  }

  const setFilteredData = (data) => {
    filteredData.value = data;
  }

  const setCurrentPage = (data) => {
    if (data === 'inc') {
      currentPage.value++;
    } else {
      currentPage.value--;
    }
  }

  const toggelModal = (flag) => {
    showModal.value = flag;
  }

  const input = computed(() => searchInput.value)

  return {
    user,
    filteredData,
    currentPage,
    pageSize,
    searchInput,
    input,
    showModal,
    setUserData,
    setFilteredData,
    setSearchQuery,
    setCurrentPage,
    toggelModal
  }
});
