<template>
  <div id="app">
    <v-app>
      <v-app-bar class="grey darken-2" max-height="70">
        <v-app-bar-title class="white--text ml-4">
          <div class="text-h4">Arcain</div>
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <div>
          <v-tooltip bottom nudge-bottom="5">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mr-5"
                color="white"
                icon
                v-bind="attrs"
                v-on="on"
                @click="showCart"
              >
                <v-icon>mdi-cart-variant</v-icon>
              </v-btn>
            </template>
            <span>Cart</span>
          </v-tooltip>
          <v-btn
            v-if="!shoeStore.userLoggedIn"
            class="mr-5"
            elevation="0"
            @click="logingIn"
          >
            <v-icon>mdi-login</v-icon>
            <span class="ml-2">Log In</span>
          </v-btn>
            <v-menu offset-y v-if="shoeStore.userLoggedIn">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                class="mr-4"
                  v-on="on"
                  v-bind="attrs"
                  elevation="0"
                  icon
                >
                  <v-avatar color="white" size="36">HC</v-avatar>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="loggedOut">
                  <v-list-item-title>Log Out</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
        </div>
      </v-app-bar>
      <router-view />
      <LoginPage :dialog="loginDialog" @cancel="cancelDialog" />
      <CartPage :dialog="cartDialog" @cancel="cancelCart" />
    </v-app>
  </div>
</template>

<script>
import LoginPage from "./views/LoginPage.vue";
import CartPage from "./views/CartPage.vue";
import { useShoeStore } from "./stores/ItemStore";
import { auth } from "./firebase/config.js";

export default {
  name: "App",
  setup() {
    const shoeStore = useShoeStore();
    return { shoeStore };
  },
  components: {
    LoginPage,
    CartPage,
  },
  data() {
    return {
      loginDialog: false,
      cartDialog: false,
    };
  },
  methods: {
    logingIn() {
      this.loginDialog = true;
    },
    cancelDialog() {
      this.loginDialog = false;
    },
    showCart() {
      this.cartDialog = true;
    },
    cancelCart() {
      this.cartDialog = false;
    },
    async loggedOut() {
      await auth.signOut();
      this.shoeStore.isLoggedIn = false
    },
  },
};
</script>