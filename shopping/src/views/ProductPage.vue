<template>
  <v-dialog :value="dialog" max-width="600" persistent>
    <v-card>
      <v-carousel hide-delimiters height="400">
        <v-carousel-item v-for="(img, i) in item?.data?.image || []" :key="i">
          <v-img :src="img" contain></v-img>
        </v-carousel-item>
      </v-carousel>

      <v-card-text class="mt-3 pt-2">
        <v-row>
          <v-col cols="5">
            <div class="body-1 font-weight-bold">{{ productName }}</div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-rating
              color="warning"
              full-icon="mdi-star"
              length="5"
              readonly
              dense
              size="25"
              :value="rating"
            ></v-rating>
          </v-col>
        </v-row>
        <div class="mt-3">
          {{ productName }} is made with eco-friendly materials. Ideal for every
          situation, this product excels specifically in a sport setting. Clothe
          yourself with your own {{ productName }}
        </div>
        <v-subheader></v-subheader>
        <v-row justify="end">
          <v-col cols="6">
            <v-select
              v-model="selectedSize"
              :items="shoeStore.size"
              rounded
              outlined
              item-value="value"
              item-text="text"
              placeholder="Select Size"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="grey" text @click="cancelCart">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="addProduct">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { useShoeStore } from "../stores/ItemStore";

export default {
  setup() {
    const shoeStore = useShoeStore();
    return { shoeStore };
  },
  data() {
    return {
      selectedSize: '',
    }
  },
  props: {
    dialog: Boolean,
    item: Object,
  },
  methods: {
    cancelCart() {
      this.$emit("cancel");
    },
    addProduct() {
      let selected = {
        quantity:1,
        product: this.item, 
        size: this.selectedSize,
      }
      this.shoeStore.cart.push(selected)
      console.log(this.shoeStore.cart)
      this.selectedSize = '',
      this.cancelCart()
    }
  },
  computed: {
    productName() {
      return this.item?.data?.name || "";
    },
    rating() {
      return this.item?.data?.rating || 0
    },
  },
};
</script>

<style>
</style>