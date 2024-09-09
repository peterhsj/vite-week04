<template>
  <div class="view">
    <h1>動態路由 (id: {{ id }})</h1>
    {{ person }}
  </div>
</template>

<script setup>
  // useRoute (狀態), useRouter (方法)
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  const route = useRoute();
  const { id } = route.params;
  const person = ref({});

  onMounted(async() => {
    const data = await axios.get(`https://randomuser.me/api/?seed=${id}`);
    console.log({data});
    person.value = data.data.results[0];
  })
  
</script>