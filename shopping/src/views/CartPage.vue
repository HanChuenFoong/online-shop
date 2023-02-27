<template>
  <v-dialog :value="dialog" max-width="700" persistent>
    <v-card>
      <v-card-title>Your Shopping Cart</v-card-title>
      <v-card-subtitle class="pt-2"
        >Confirm the purchase of these items.</v-card-subtitle
      >
      <v-divider></v-divider>
      <v-subheader></v-subheader>
      <v-card-text>
        <div v-if="shoeStore.cart.length">
          <div v-for="(item, i) of shoeStore.cart" :key="i">
            <v-row class="mt-4">
              <v-col cols="5">
                <v-img
                  height="200"
                  width="300"
                  :src="item.product.data.image[0]"
                ></v-img>
              </v-col>
              <v-col cols="4" class="ml-4">
                <div class="font-weight-bold text-h6">
                  {{ item.product.data.name }}
                </div>
                <div>Size: {{ item.size }}</div>
                <div>Quantity: {{ item.quantity }}</div>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="auto">
                <div class="font-weight-bold text-h6">
                  $ {{ item.product.data.price * item.quantity }}
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
        <div v-else class="text-center">
          <v-icon size="75">mdi-cart-remove</v-icon>
          <div class="text-h6 font-weight-bold mt-4">Empty Shopping Cart</div>
          <p>Add items to purchase</p>
        </div>
        <v-subheader></v-subheader>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <div class="font-weight-bold text-h6">
              Total Amount: $ {{ subtotal }}
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="grey" text @click="cancelCart">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="paymentCart">Continue</v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar
      v-model="cartSnackbar"
      class="mb-15"
      width="200"
    >
      Please add items into shopping cart.
      <template v-slot:action="{ attrs }">
        <v-btn
          color="warning"
          text
          v-bind="attrs"
          @click="cartSnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
    v-model="loggedSnackbar"
    class="mb-15"
    width="200"
  >
    Please log in to checkout.
    <template v-slot:action="{ attrs }">
      <v-btn
        color="red"
        text
        v-bind="attrs"
        @click="directLogIn"
      >
        Log In
      </v-btn>
      <v-btn
        color="warning"
        text
        v-bind="attrs"
        @click="loggedSnackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
  </v-dialog>
</template>

<script>
import { useShoeStore } from "../stores/ItemStore";
import { auth } from "../firebase/config";

export default {
  setup() {
    const shoeStore = useShoeStore();
    return { shoeStore };
  },
  props: {
    dialog: Boolean,
  },
  data() {
    return {
      cartSnackbar: false,
      loggedSnackbar: false,
    }
  },
  methods: {
    cancelCart() {
      this.$emit("cancel");
    },
    async paymentCart() {
      if (!this.shoeStore.cart.length) {
        this.cartSnackbar = true
        return;
      }
      if (!auth.currentUser) {
        this.loggedSnackbar = true
        return;
      }
      const { url } = await fetch("http://localhost:3000/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(r => r.json())
      window.location.href = url
    },
    directLogIn() {
      this.$emit('directLogIn')
      this.loggedSnackbar = false
    }
  },
  computed: {
    subtotal() {
      let total = 0;
      for (let item of this.shoeStore.cart)
        total += item.product.data.price * item.quantity;
      return total.toFixed(2);
    },
  },
};
</script>

<style>
</style>