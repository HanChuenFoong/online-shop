import { defineStore } from "pinia";
import { getShoes, addProfile } from "../admin.js";

export const useShoeStore = defineStore("shoe", {
  state: () => ({
    inventory: [],
    profile: {},
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
});
