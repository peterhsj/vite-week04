import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// 匯出 Store
export const useCountStore = defineStore('countStore', () => {
  // state
  const count = ref(1)
  
  // getter
  const doubleCount = computed(() => count.value * 2)
  
  // action
  function increment() {
    count.value++
  }
  return {count, doubleCount, increment}
})