<template>
  <div id="app">
    <v-app>
      <v-app-bar class="grey darken-2" max-height="70">
        <v-app-bar-title class="ml-4">
          <div class="text-h4">Adidaz</div>
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn class="mr-5" elevation="0" @click="logingIn">
          <v-icon>mdi-login</v-icon>
          <span class="ml-2">Log In</span>
        </v-btn>
      </v-app-bar>
      <router-view />
      <LoginPage :dialog="loginDialog" @cancel="cancelDialog" />
    </v-app>
  </div>
</template>

<script>
import LoginPage from './views/LoginPage.vue'
  export default {
    name: 'App',
    components: {
      LoginPage
    },
    data() {
      return {
        loginDialog: false,
      }
    },
    methods: {
      logingIn() {
        this.loginDialog = true
      },
      cancelDialog() {
        this.loginDialog = false
      }
    }
  }
</script>