<script setup>
import { RouterView } from 'vue-router'
import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: 'reverb',
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: import.meta.env.VITE_REVERB_HOST,
  wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
  wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
  forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
  enabledTransports: ['ws', 'wss'],
  // auth: {
  //   headers: {
  //     Authorization: "Bearer " + localStorage.getItem("access_token"),
  //   },
  // },
  // authEndpoint: "http://localhost:8000/api/broadcasting/auth",
});

</script>

<template>
  <notifications position="top right" />
  <RouterView />
</template>

<style scoped>
</style>
