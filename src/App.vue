<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useConfigStore } from '@/stores/user'

// import Vconsole from 'vconsole';
// new Vconsole()

useConfigStore()
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
