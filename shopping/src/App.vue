<template>
  <div id="app">
    <v-app>
      <v-app-bar class="primary lighten-3" max-height="70">
      </v-app-bar>
      <router-view />
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {
    }
  }
</script>