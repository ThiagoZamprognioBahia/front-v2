<template>
    <v-alert v-if="show" :type="type" :text="message"></v-alert>
  </template>
  
  <script setup>
  import { ref, onMounted, defineProps } from 'vue';
  
  const { message, type } = defineProps(['message', 'type']);
  const show = ref(true);
  
  onMounted(() => {
    setTimeout(() => {
      show.value = false;
    }, 5000);
  });
  </script>