<template>
  <div id="app">
    <v-app v-if="shoeStore.isAuthReady">
      <v-app-bar class="grey darken-2" max-height="70">
        <v-app-bar-title class="white--text ml-4">
          <a href="/">
            <div class="text-h4 logo">Arcain</div>
          </a>
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <div>
          <v-badge
          class="mr-5"
            :content="shoeStore.cart.length"
            :value="shoeStore.cart.length"
            offset-x="25"
            offset-y="45"
            overlap
          >
            <v-btn class="ma-0 pa-0" color="white" icon @click="showCart">
              <v-icon>mdi-cart-variant</v-icon>
            </v-btn>
          </v-badge>
          <v-btn
            v-if="!shoeStore.isLoggedIn"
            class="mr-5"
            elevation="0"
            @click="loggingIn"
          >
            <v-icon>mdi-login</v-icon>
            <span class="ml-2">Log In</span>
          </v-btn>
          <v-menu offset-y v-if="shoeStore.isLoggedIn">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="mr-4" v-on="on" v-bind="attrs" elevation="0" icon>
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
      <CartPage :dialog="cartDialog" @cancel="cancelCart" @directLogIn="logInCheckout" />
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
    loggingIn() {
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
      this.shoeStore.isLoggedIn = false;
    },
    logInCheckout() {
      this.cancelCart()
      this.loggingIn()
    }
  },
  mounted() {
    this.shoeStore.getAuthIsReady()
  },
};
</script>

<style>
  .logo {
    color: white; 
  } 
  a {
    text-decoration: none;
  }
</style>