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
  methods: {
    cancelCart() {
      this.$emit("cancel");
    },
    paymentCart() {
      if (!auth.currentUser || !this.shoeStore.cart.length) {
        console.log("Email needed or cart empty");
        return;
      }
      fetch("/create-checkout-session", {
        method : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {id: 1, quantity: 3},
            {id: 2, quantity: 1},
          ],
        }),
      })
      .then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
      })
      .then(({url}) => {
        console.log(url)
        // window.location = url
      })



    },
  },
  computed: {
    subtotal() {
      let total = 0;
      for (let item of this.shoeStore.cart)
        total += item.product.data.price * item.quantity;
      return total;
    },
  },
};
</script>

<style>
</style>