<template>
  <div id="app">
    <v-app>
      <v-app-bar class="grey darken-2" max-height="70">
        <v-app-bar-title>ShoeShine</v-app-bar-title>
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