<template>
  <q-page class="page">
    <Welcome/>
  </q-page>
</template>

<script>
import Welcome from '@/components/WelcomeComp.vue';

export default {
  name: 'HomeView',
  components: {
    Welcome,
  },
};
</script>
