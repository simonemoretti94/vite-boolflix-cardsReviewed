<script>
import { state } from './state';

import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';

export default {
  name: 'app',
  components: {
    AppHeader,
    AppMain,
  },
  data() {
    return {
      state,
    }
  },

  mounted() {

    state.cards = state.fetchData(state.urlAPI, state.cards);
    state.loadingAPI = false;

  },
}
</script>

<template>
  <AppHeader></AppHeader>
  <AppMain></AppMain>
</template>

<style scoped></style>