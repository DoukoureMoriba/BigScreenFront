<script setup>
import { RouterLink, RouterView } from 'vue-router'
import ToastProvider from '../src/provider/toastprovider';
import Toast from '../src/components/Toast.vue'
import { provide } from 'vue';

/** Toaster */
const { toaster } = ToastProvider();
provide('toaster', toaster);
</script>

<template>

<Toast />

  <RouterView />
</template>

<style >


</style>
