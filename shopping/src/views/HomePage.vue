<template>
  <div>
    <div class="text-center" v-if="loading">
      <v-progress-circular
        size="64"
        color="primary"
        indeterminate
        class="mx-auto align-self-center my-10"
      ></v-progress-circular>
    </div>
    <div v-else>
      <v-sheet class="grey" height="100%">
        <div>
          <v-img
            max-height="650"
            src="https://images.unsplash.com/photo-1475293831741-1b69e67acb72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
          ></v-img>
        </div>
        <v-subheader></v-subheader>
        <v-container>
          <div class="white--text text-h6">
            The only site for all your sporting needs!
          </div>
          <div class="white--text subtitle-1">
            Shop Arcain for all styles of sport apparel including sneakers,
            high-performance running shoes, hoodies, sweatpants, and comfy
            slides.
          </div>
          <v-subheader></v-subheader>
        </v-container>
        <v-item-group>
          <v-row>
            <v-col v-for="item in shoeStore.inventory" :key="item.id">
              <v-card
                max-width="444"
                class="mx-auto"
                outlined
                @click="viewProduct(item)"
              >
                <v-img
                  contain
                  max-height="295"
                  max-width="444"
                  :src="item.data.image[0]"
                ></v-img>
                <v-card-text>
                  <v-row>
                    <v-col cols="6">
                      <div class="body-1">{{ item.data.name }}</div>
                      <div>{{ item.data.gender }}</div>
                      <div class="body-2 pt-1">$ {{ item.data.price }}</div>
                    </v-col>
                    <v-col cols="6">
                      <v-rating
                        color="warning"
                        full-icon="mdi-star"
                        length="5"
                        readonly
                        dense
                        size="25"
                        :value="item.data.rating"
                      ></v-rating>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-item-group>
        <v-subheader></v-subheader>
        <ProductPage
          :dialog="productDialog"
          :item="selectedItem"
          @cancel="closeViewProdcut"
        />
      </v-sheet>
      <v-sheet class="teal lighten-4" height="100%">
        <v-container class="text-center">
          <v-subheader></v-subheader>
          <div class="text-h5">Join Arcain Clan and receive 90% off your first order.</div>
          <p>Type in your email to retrieve your discount code.</p>
          <v-row justify="center" dense>
            <v-col cols="3"> 
              <v-text-field v-model="email" label="Email Address" outlined></v-text-field>
            </v-col>
            <v-col cols="1" class="pt-3">
              <v-btn color="primary" @click="submitEmail">
                <span>Submit</span>
                <v-icon class="ml-2">mdi-send</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-subheader></v-subheader>
        </v-container>
      </v-sheet>
      <v-sheet class="blue-grey darken-3" height="100%">
        <v-row justify="center" align="center">
          <v-col cols="auto">
            <p class="mb-0 white--text">©2022 Arcain. Terms and Conditions. Privacy Policy.</p>
          </v-col>
        </v-row>
      </v-sheet>
    </div>
    <v-snackbar
    v-model="snackbar"
    class="mb-15"
  >
    Discount code generated for '{{targetEmail}}'
    <template v-slot:action="{ attrs }">
      <v-btn
        color="warning"
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
  </div>
</template>

<script>
import { useShoeStore } from "../stores/ItemStore";
import ProductPage from "@/views/ProductPage.vue";

export default {
  name: "HomePage",
  setup() {
    const shoeStore = useShoeStore();
    return { shoeStore };
  },
  components: {
    ProductPage,
  },
  data() {
    return {
      productDialog: false,
      selectedItem: {},
      loading: false,
      email: '',
      snackbar: false,
      targetEmail: '',
    };
  },
  computed: {},
  methods: {
    async loadInventory() {
      this.loading = true;
      await this.shoeStore.getInventory();
    },
    viewProduct(item) {
      this.selectedItem = item;
      this.productDialog = true;
    },
    closeViewProdcut() {
      this.productDialog = false;
    },
    submitEmail() {
      this.targetEmail = this.email
      this.email = ''
      this.snackbar = true
    }
  },
  mounted() {
    this.loadInventory();
  },
  watch: {
    'shoeStore.inventory'() {
      this.loading = false;
    }
  }
};
</script>