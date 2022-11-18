import { defineStore } from "pinia";
import { getShoes, addProfile } from "../admin.js";

export const useShoeStore = defineStore("shoe", {
  state: () => ({
    inventory: [],
    profile: {},
    cart: [],
    size: [
      {
        text: 'Extra Small',
        value: 'xs',
      },
      {
        text: 'Small',
        value: 's',
      },
      {
        text: 'Medium',
        value: 'm',
      },
      {
        text: 'Large',
        value: 'l',
      },
      {
        text: 'Extra Large',
        value: 'xl',
      },
    ],
    quantity: [1,2,3,4,5,6,7,8,9,10],
    isLoggedIn: false,
  }),
  actions: {
    async getInventory() {
      let res = await getShoes();
      this.inventory = res;
    },
    async createAccount(payload) {
      let res = await addProfile(payload);
      this.profile = res
    }
  },
  getters: {
    userLoggedIn() {
      return this.isLoggedIn
    }
  }
});
